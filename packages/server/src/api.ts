import type { Fn, Maybe, MaybePromise } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type { Route, RouteMatch } from "@thi.ng/router";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Server } from "./server.js";
import type { ServerSession } from "./interceptors/session.js";

export interface ServerOpts {
	logger: ILogger;
	/**
	 * SSL configuration
	 */
	ssl: {
		key: string;
		cert: string;
	};
	/**
	 * Host name this server should respond to.
	 *
	 * @defaultValue `localhost`
	 */
	host: string;
	/**
	 * Port number.
	 *
	 * @defaultValue 443 / 8080
	 */
	port: number;
	/**
	 * Initial list of routes (more can be added dynamically via
	 * {@link Server.addRoutes}).
	 */
	routes: ServerRoute[];
	/**
	 * Route prefix. Default: `/`. All routes are assumed to have this prefix
	 * prepended. If given, the prefix MUST end with `/`.
	 */
	prefix: string;
	/**
	 * If true (default), the trailing slash of a given route input string will
	 * be removed before matching.
	 */
	trim: boolean;
	/**
	 * Interceptors (aka pre/post middlewares) which are to be applied to all
	 * route handlers (in the given order).
	 */
	intercept: Interceptor[];
}

export interface ServerRoute extends Route {
	handlers: Partial<Record<Method, RequestHandler>>;
}

export interface CompiledServerRoute extends Route {
	handlers: Partial<Record<Method, CompiledHandler>>;
}

export interface RequestCtx {
	server: Server;
	logger: ILogger;
	req: IncomingMessage;
	res: ServerResponse;
	route: CompiledServerRoute;
	match: RouteMatch;
	path: string;
	query: Record<string, any>;
	cookies?: Record<string, string>;
	session?: ServerSession;
	[id: string]: any;
}

export type HandlerResult = MaybePromise<Maybe<RequestCtx> | void>;

export type RequestHandler =
	| Fn<RequestCtx, HandlerResult>
	| InterceptedRequestHandler;

export interface InterceptedRequestHandler {
	fn: Fn<RequestCtx, HandlerResult>;
	/**
	 * List of interceptors which will be executed when processing the main
	 * handler {@link InterceptedRequestHandler.fn}.
	 *
	 * @remarks
	 * Handler-specific interceptors will be appended to the list global
	 * interceptors (aka {@link ServerOpts.intercept}). Processing then happens
	 * in this order:
	 *
	 * - {@link Interceptor.pre} interceptors in the order given
	 * - {@link InterceptedRequestHandler.fn} main handler
	 * - {@link Interceptor.post} interceptors in the REVERSE order given
	 *
	 * If an interceptor function returns false, further processing stops and
	 * response will be closed.
	 */
	intercept: Interceptor[];
}

export interface CompiledHandler {
	fn: Fn<RequestCtx, HandlerResult>;
	pre?: Fn<RequestCtx, InterceptorResult>[];
	post?: Fn<RequestCtx, InterceptorResult>[];
}

export interface Interceptor {
	/**
	 * Interceptor function which will be run BEFORE the main route handler (aka
	 * {@link InterceptedRequestHandler.fn}). If an interceptor needs to cancel
	 * the request processing it must return `false`. In this case any further
	 * pre-interceptors, the main handler and all post-interceptors will be
	 * skipped.
	 */
	pre?: Fn<RequestCtx, InterceptorResult>;
	/**
	 * Interceptor function which will be run AFTER the main route handler (aka
	 * {@link InterceptedRequestHandler.fn}). If an interceptor needs to cancel
	 * the request processing it must return `false`. In this case any further
	 * post-interceptors will be skipped.
	 */
	post?: Fn<RequestCtx, InterceptorResult>;
}

export type InterceptorResult = MaybePromise<boolean>;

export type Method =
	| "get"
	| "put"
	| "post"
	| "delete"
	| "head"
	| "options"
	| "patch";
