// SPDX-License-Identifier: Apache-2.0
import { identity, type Fn, type Fn0, type Maybe } from "@thi.ng/api";
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
	Interceptor,
	Method,
	PostInterceptorResult,
	PreInterceptorResult,
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
	protected methodAdapter: ServerOpts["method"];

	constructor(public opts: Partial<ServerOpts<CTX>> = {}) {
		this.logger = opts.logger ?? new ConsoleLogger("server");
		this.host = opts.host ?? "localhost";
		this.methodAdapter =
			opts.method ??
			((method, { route }) =>
				method === "head" && !route.handlers.head && route.handlers.get
					? (console.log("adapted head"), "get")
					: method);
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
		const {
			ssl,
			host = "localhost",
			port = ssl ? 443 : 8080,
			uniqueHeaders,
			blockList,
			requestTimeout,
		} = this.opts;
		try {
			this.server = ssl
				? https.createServer(
						{
							key: readText(ssl.key, this.logger),
							cert: readText(ssl.cert, this.logger),
							ServerResponse,
							uniqueHeaders,
							blockList,
							requestTimeout,
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
			if (req.url!.includes("#")) return res.badRequest();
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
			const rawCookies =
				req.headers["cookie"] || req.headers["set-cookie"]?.join(";");
			const cookies = rawCookies ? parseCoookies(rawCookies) : {};
			const query = parseSearchParams(url.searchParams);
			const origMethod = <Method>req.method!.toLowerCase();
			const method = this.methodAdapter(origMethod, {
				req,
				route,
				match,
				query,
				cookies,
			});
			if (method === "options" && !route.handlers.options) {
				return res.noContent({
					allow: Object.keys(route.handlers).map(upper).join(", "),
				});
			}
			const ctx = this.augmentCtx({
				// @ts-ignore
				server: this,
				logger: this.logger,
				url,
				req,
				res,
				path,
				query,
				cookies,
				route,
				match,
				method,
				origMethod,
			});
			const handler = route.handlers[method];
			if (handler) {
				this.runHandler(handler, ctx);
			} else {
				res.notAllowed();
			}
		} catch (e) {
			this.logger.warn(`error:`, req.url!, (<Error>e).message);
			res.writeHead(500).end();
		}
	}

	protected async runHandler({ fn, pre, post }: CompiledHandler, ctx: CTX) {
		try {
			let failed: Maybe<number>;
			if (pre) {
				for (let i = 0, n = pre.length; i < n; i++) {
					const fn = pre[i];
					if (fn && !(await fn(ctx))) {
						ctx.res.end();
						failed = i;
						break;
					}
				}
			}
			if (failed === undefined) await fn(ctx);
			if (post) {
				for (let i = failed ?? post.length; --i >= 0; ) {
					const fn = post[i];
					if (fn) await fn(ctx);
				}
			}
			ctx.res.end();
		} catch (e) {
			this.logger.warn(`handler error:`, e);
			if (!ctx.res.headersSent) {
				ctx.res.writeHead(500).end();
			}
		}
	}

	protected compileRoute(route: ServerRoute<CTX>): CompiledServerRoute<CTX> {
		const compilePhase = <T>(
			handler: RequestHandler<CTX>,
			phase: "pre" | "post"
		) => {
			let isPhaseUsed = false;
			const $bind = (iceps?: Interceptor<CTX>[]) =>
				(iceps ?? []).map((x) => {
					if (x[phase]) {
						isPhaseUsed = true;
						return <any>x[phase].bind(x);
					}
				});
			const fns: Maybe<Fn<CTX, T>>[] = [...$bind(this.opts.intercept)];
			if (!isFunction(handler)) {
				fns.push(...$bind(handler.intercept));
			}
			return isPhaseUsed ? fns : undefined;
		};
		const result: CompiledServerRoute<CTX> = { ...route, handlers: {} };
		for (const method in route.handlers) {
			const handler = route.handlers[<Method>method]!;
			result.handlers[<Method>method] = {
				fn: isFunction(handler) ? handler : handler.fn,
				pre: compilePhase<PreInterceptorResult>(handler, "pre"),
				post: compilePhase<PostInterceptorResult>(handler, "post"),
			};
		}
		return result;
	}

	addRoutes(routes: ServerRoute<CTX>[]) {
		for (const r of routes) {
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
	/**
	 * Writes a HTTP 204 header (plus given `headers`) and ends the response.
	 *
	 * @param headers
	 */
	noContent(headers?: http.OutgoingHttpHeaders) {
		this.writeHead(204, headers).end();
	}

	/**
	 * Writes a HTTP 302 header to redirect to given URL, add given additional
	 * `headers` and ends the response.
	 *
	 * @remarks
	 * Also see {@link ServerResponse.seeOther}.
	 *
	 * @param headers
	 */
	redirectTo(location: string, headers?: http.OutgoingHttpHeaders) {
		this.writeHead(302, { ...headers, location }).end();
	}

	/**
	 * Writes a HTTP 303 header to redirect to given URL, add given additional
	 * `headers` and ends the response.
	 *
	 * @remarks
	 * Also see {@link ServerResponse.redirectTo}.
	 *
	 * @param headers
	 */
	seeOther(location: string, headers?: http.OutgoingHttpHeaders) {
		this.writeHead(303, { ...headers, location }).end();
	}

	/**
	 * Writes a HTTP 304 header (plus given `headers`) and ends the response.
	 *
	 * @param headers
	 */
	unmodified(headers?: http.OutgoingHttpHeaders) {
		this.writeHead(304, headers).end();
	}

	/**
	 * Writes a HTTP 400 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
	badRequest(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(400, headers).end(body);
	}

	/**
	 * Writes a HTTP 401 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
	unauthorized(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(401, headers).end(body);
	}

	/**
	 * Writes a HTTP 403 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
	forbidden(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(403, headers).end(body);
	}

	/**
	 * Writes a HTTP 404 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
	missing(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(404, headers).end(body);
	}

	/**
	 * Writes a HTTP 405 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
	notAllowed(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(405, headers).end(body);
	}

	/**
	 * Writes a HTTP 406 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
	notAcceptable(headers?: http.OutgoingHttpHeaders, body?: any) {
		this.writeHead(406, headers).end(body);
	}

	/**
	 * Writes a HTTP 429 header (plus given `headers`) and ends the response
	 * (with optional `body`).
	 *
	 * @param headers
	 */
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
