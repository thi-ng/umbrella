import type { Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import { readText } from "@thi.ng/file-io";
import { ConsoleLogger, type ILogger } from "@thi.ng/logger";
import { preferredType } from "@thi.ng/mime";
import { Router, type RouteMatch } from "@thi.ng/router";
import { createReadStream } from "node:fs";
import * as http from "node:http";
import * as https from "node:https";
import { pipeline } from "node:stream";
import { createGzip, createBrotliCompress } from "node:zlib";
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

const MISSING = "__missing";

export class Server {
	logger: ILogger;
	router: Router;
	server!: http.Server;

	constructor(public opts: Partial<ServerOpts> = {}) {
		this.logger = opts.logger ?? new ConsoleLogger("server");
		const routes: ServerRoute[] = [
			{
				id: MISSING,
				match: ["__404__"],
				handlers: {
					get: async ({ res }) => this.missing(res),
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
		const ssl = this.opts.ssl;
		const port = this.opts.port ?? (ssl ? 443 : 8080);
		const host = this.opts.host ?? "localhost";
		try {
			this.server = ssl
				? https.createServer(
						{
							key: readText(ssl.key, this.logger),
							cert: readText(ssl.cert, this.logger),
						},
						this.listener.bind(this)
				  )
				: http.createServer({}, this.listener.bind(this));
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

	async listener(req: http.IncomingMessage, res: http.ServerResponse) {
		const url = new URL(req.url!, `http://${req.headers.host}`);
		if (this.opts.host && this.opts.host !== url.host) {
			res.writeHead(503).end();
			return;
		}
		const path = decodeURIComponent(url.pathname);
		try {
			const query = parseSearchParams(url.searchParams);
			const match = this.router.route(path)!;
			const route = <CompiledServerRoute>(
				this.router.routeForID(match.id)!.spec
			);
			const rawCookies = req.headers["set-cookie"]?.join(";");
			const cookies = rawCookies ? parseCoookies(rawCookies) : {};
			const ctx: RequestCtx = {
				server: this,
				logger: this.logger,
				req,
				res,
				path,
				query,
				cookies,
				route,
				match,
			};
			if (match.id === MISSING) {
				this.runHandler(route.handlers.get!, ctx);
				return;
			}
			let method = <Method>(
				(ctx.query?.__method || req.method!.toLowerCase())
			);
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
				res.writeHead(405).end();
			}
		} catch (e) {
			this.logger.warn("error:", (<Error>e).message);
			res.writeHead(500).end();
		}
	}

	async runHandler({ fn, pre, post }: CompiledHandler, ctx: RequestCtx) {
		const runPhase = async (fns: Fn<RequestCtx, InterceptorResult>[]) => {
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
			this.logger.warn(`handler error: ${e}`);
			ctx.res.writeHead(500).end();
		}
	}

	protected compileRoute(route: ServerRoute): CompiledServerRoute {
		const compilePhase = (
			handler: RequestHandler,
			phase: "pre" | "post"
		) => {
			const fns: Fn<RequestCtx, InterceptorResult>[] = [];
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
		const result: CompiledServerRoute = { ...route, handlers: {} };
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

	addRoutes(routes: ServerRoute[]) {
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
		compress = true
	) {
		const mime =
			headers?.["content-type"] ??
			preferredType(path.substring(path.lastIndexOf(".")));
		const accept = <string>req.headers["accept-encoding"];
		// FIXME
		const useBrotli = compress && accept?.includes("br");
		const useGzip = compress && !useBrotli && accept?.includes("gzip");
		return new Promise<void>((resolve) => {
			try {
				this.logger.debug("sending file:", path, "mime:", mime, accept);
				const src = createReadStream(path);
				res.writeHead(200, { "content-type": mime, ...headers });
				const finalize = (err: any) => {
					if (err) res.end();
					resolve();
				};
				if (useBrotli) {
					res.appendHeader("content-encoding", "br");
					pipeline(src, createBrotliCompress(), res, finalize);
				} else if (useGzip) {
					res.appendHeader("content-encoding", "gzip");
					pipeline(src, createGzip(), res, finalize);
				} else {
					pipeline(src, res, finalize);
				}
			} catch (e) {
				this.logger.warn((<Error>e).message);
				this.missing(res);
				resolve();
			}
		});
	}

	unauthorized(res: http.ServerResponse) {
		res.writeHead(403, "Forbidden").end();
	}

	missing(res: http.ServerResponse) {
		res.writeHead(404, "Not found").end();
	}

	redirectTo(res: http.ServerResponse, location: string) {
		res.writeHead(302, { location }).end();
	}

	redirectToRoute(res: http.ServerResponse, route: RouteMatch) {
		this.redirectTo(res, this.router.format(route));
	}
}
