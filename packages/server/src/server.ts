// SPDX-License-Identifier: Apache-2.0
import { identity, type Fn, type Fn0 } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import { readText } from "@thi.ng/file-io";
import { ConsoleLogger, type ILogger } from "@thi.ng/logger";
import { preferredTypeForPath } from "@thi.ng/mime";
import { Router, type RouteMatch } from "@thi.ng/router";
import { upper } from "@thi.ng/strings";
import { createReadStream } from "node:fs";
import * as http from "node:http";
import * as https from "node:https";
import { isIPv6 } from "node:net";
import { pipeline, Transform } from "node:stream";
import { createBrotliCompress, createDeflate, createGzip } from "node:zlib";
import type {
	CompiledHandler,
	CompiledServerRoute,
	InterceptorResult,
	Method,
	RequestCtx,
	RequestHandler,
	ServerOpts,
	ServerRoute,
} from "./api.js";
import { parseCoookies } from "./utils/cookies.js";
import { parseSearchParams } from "./utils/formdata.js";
import { isMatchingHost, normalizeIPv6Address } from "./utils/host.js";

const MISSING = "__missing";

export class Server<CTX extends RequestCtx = RequestCtx> {
	logger: ILogger;
	router: Router<CompiledServerRoute<CTX>>;
	server!: http.Server<typeof http.IncomingMessage, typeof ServerResponse>;
	host: string;

	protected augmentCtx: Fn<RequestCtx, CTX>;

	constructor(public opts: Partial<ServerOpts<CTX>> = {}) {
		this.logger = opts.logger ?? new ConsoleLogger("server");
		this.host = opts.host ?? "localhost";
		if (isIPv6(this.host)) this.host = normalizeIPv6Address(this.host);
		this.augmentCtx = opts.context ?? <any>identity;
		const routes: ServerRoute<CTX>[] = [
			{
				id: MISSING,
				match: ["__404__"],
				handlers: {
					get: async ({ res }) => res.missing(),
				},
			},
			...(this.opts.routes ?? []),
		];
		this.router = new Router({
			default: MISSING,
			prefix: opts.prefix ?? "/",
			trim: opts.trim ?? true,
			routes: routes.map(this.compileRoute.bind(this)),
		});
	}

	async start() {
		const { ssl, host = "localhost", port = ssl ? 443 : 8080 } = this.opts;
		try {
			this.server = ssl
				? https.createServer(
						{
							key: readText(ssl.key, this.logger),
							cert: readText(ssl.cert, this.logger),
							ServerResponse,
						},
						this.listener.bind(this)
				  )
				: http.createServer(
						{ ServerResponse },
						this.listener.bind(this)
				  );
			this.server.listen(port, host, undefined, () => {
				this.logger.info(
					`starting server: http${ssl ? "s" : ""}://${host}:${port}`
				);
			});
			return true;
		} catch (e) {
			this.logger.severe(<Error>e);
			return false;
		}
	}

	async stop() {
		if (this.server) {
			this.logger.info(`stopping server...`);
			this.server.close();
		}
		return true;
	}

	protected async listener(req: http.IncomingMessage, res: ServerResponse) {
		try {
			const url = new URL(req.url!, `http://${req.headers.host}`);
			if (this.opts.host && !isMatchingHost(url.hostname, this.host)) {
				this.logger.debug(
					"ignoring request, host mismatch:",
					url.hostname,
					this.host
				);
				return res.noResponse();
			}
			const path = decodeURIComponent(url.pathname);
			const match = this.router.route(path)!;
			if (match.id === MISSING) return res.missing();
			const route = <CompiledServerRoute>(
				this.router.routeForID(match.id)!.spec
			);
			let method = <Method>req.method!.toLowerCase();
			if (method === "options" && !route.handlers.options) {
				return res.noContent({
					allow: Object.keys(route.handlers).map(upper).join(", "),
				});
			}
			const rawCookies =
				req.headers["cookie"] || req.headers["set-cookie"]?.join(";");
			const cookies = rawCookies ? parseCoookies(rawCookies) : {};
			const query = parseSearchParams(url.searchParams);
			const ctx = this.augmentCtx({
				// @ts-ignore
				server: this,
				logger: this.logger,
				req,
				res,
				path,
				query,
				cookies,
				route,
				match,
			});
			if (
				method === "head" &&
				!route.handlers.head &&
				route.handlers.get
			) {
				method = "get";
			}
			const handler = route.handlers[method];
			if (handler) {
				this.runHandler(handler, ctx);
			} else {
				res.notAllowed();
			}
		} catch (e) {
			this.logger.warn("error:", (<Error>e).message);
			res.writeHead(500).end();
		}
	}

	protected async runHandler({ fn, pre, post }: CompiledHandler, ctx: CTX) {
		const runPhase = async (fns: Fn<CTX, InterceptorResult>[]) => {
			for (let f of fns) {
				if (!(await f(ctx))) {
					ctx.res.end();
					return false;
				}
			}
			return true;
		};
		try {
			if (pre && !(await runPhase(pre))) return;
			await fn(ctx);
			if (post && !(await runPhase(post))) return;
			ctx.res.end();
		} catch (e) {
			this.logger.warn(`handler error:`, e);
			if (!ctx.res.headersSent) {
				ctx.res.writeHead(500).end();
			}
		}
	}

	protected compileRoute(route: ServerRoute<CTX>): CompiledServerRoute<CTX> {
		const compilePhase = (
			handler: RequestHandler<CTX>,
			phase: "pre" | "post"
		) => {
			const fns: Fn<CTX, InterceptorResult>[] = [];
			for (let x of this.opts.intercept ?? []) {
				if (x[phase]) fns.push(x[phase].bind(x));
			}
			if (!isFunction(handler)) {
				for (let x of handler.intercept ?? []) {
					if (x[phase]) fns.push(x[phase].bind(x));
				}
			}
			return fns.length
				? phase === "post"
					? fns.reverse()
					: fns
				: undefined;
		};
		const result: CompiledServerRoute<CTX> = { ...route, handlers: {} };
		for (let method in route.handlers) {
			const handler = route.handlers[<Method>method]!;
			result.handlers[<Method>method] = {
				fn: isFunction(handler) ? handler : handler.fn,
				pre: compilePhase(handler, "pre"),
				post: compilePhase(handler, "post"),
			};
		}
		return result;
	}

	addRoutes(routes: ServerRoute<CTX>[]) {
		for (let r of routes) {
			this.logger.debug("registering route:", r.id, r.match);
		}
		this.router.addRoutes(routes.map(this.compileRoute.bind(this)));
		this.logger.debug((<any>this.router).index);
	}

	sendFile(
		{ req, res }: RequestCtx,
		path: string,
		headers?: http.OutgoingHttpHeaders,
		compress = false
	) {
		const mime = headers?.["content-type"] ?? preferredTypeForPath(path);
		const accept = <string>req.headers["accept-encoding"];
		const encoding =
			compress && accept
				? (<{ mode: string; tx: Fn0<Transform> }[]>[
						{ mode: "br", tx: createBrotliCompress },
						{ mode: "gzip", tx: createGzip },
						{ mode: "deflate", tx: createDeflate },
				  ]).find((x) => accept.includes(x.mode))
				: undefined;
		return new Promise<void>((resolve) => {
			try {
				this.logger.debug("sending file:", path, "mime:", mime, accept);
				const src = createReadStream(path);
				const mergedHeaders = { "content-type": mime, ...headers };
				if (encoding) {
					mergedHeaders["content-encoding"] = encoding.mode;
				}
				res.writeHead(200, mergedHeaders);
				const finalize = (err: any) => {
					if (err) res.end();
					resolve();
				};
				encoding
					? pipeline(src, encoding.tx(), res, finalize)
					: pipeline(src, res, finalize);
			} catch (e) {
				this.logger.warn((<Error>e).message);
				res.missing();
				resolve();
			}
		});
	}

	redirectToRoute(res: ServerResponse, route: RouteMatch) {
		res.redirectTo(this.router.format(route));
	}
}

export const server = <CTX extends RequestCtx>(
	opts?: Partial<ServerOpts<CTX>>
) => new Server(opts);

/**
 * Extended version of the default NodeJS ServerResponse with additional methods
 * for various commonly used HTTP statuses/errors.
 */
export class ServerResponse extends http.ServerResponse<http.IncomingMessage> {
	noContent(headers?: http.OutgoingHttpHeaders) {
		this.writeHead(204, headers).end();
	}

	redirectTo(location: string, headers?: http.OutgoingHttpHeaders) {
		this.writeHead(302, { ...headers, location }).end();
	}

	seeOther(location: string, headers?: http.OutgoingHttpHeaders) {
		this.writeHead(303, { ...headers, location }).end();
	}

	unmodified(headers?: http.OutgoingHttpHeaders) {
		this.writeHead(304, headers).end();
	}

	unauthorized(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(401, headers).end(body);
	}

	forbidden(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(403, headers).end(body);
	}

	missing(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(404, headers).end(body);
	}

	notAllowed(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(405, headers).end(body);
	}

	notAcceptable(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(406, headers).end(body);
	}

	rateLimit(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(429, headers).end(body);
	}

	/**
	 * HTTP 444. Indicates the server has returned no information to the client and closed
	 * the connection (useful as a deterrent for malware)
	 */
	noResponse() {
		this.writeHead(444).end();
	}
}
