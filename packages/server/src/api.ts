// SPDX-License-Identifier: Apache-2.0
import type { Fn, Maybe, MaybePromise } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type { Route, RouteMatch } from "@thi.ng/router";
import type { IncomingMessage } from "node:http";
import type { ServerResponse, Server } from "./server.js";

export type Method =
	| "get"
	| "put"
	| "post"
	| "delete"
	| "head"
	| "options"
	| "patch";

export interface ServerOpts<CTX extends RequestCtx = RequestCtx> {
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
	routes: ServerRoute<CTX>[];
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
	intercept: Interceptor<CTX>[];
	/**
	 * User defined function to augment the {@link RequestCtx} object for each
	 * request before processing its handler & interceptors.
	 */
	context: Fn<RequestCtx, CTX>;
}

export interface ServerRoute<CTX extends RequestCtx = RequestCtx>
	extends Route {
	handlers: Partial<Record<Method, RequestHandler<CTX>>>;
}

/**
 * Version of {@link ServerRoute} whose handlers/interceptors already have been
 * pre-processed.
 */
export interface CompiledServerRoute<CTX extends RequestCtx = RequestCtx>
	extends Route {
	handlers: Partial<Record<Method, CompiledHandler<CTX>>>;
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
}

export type HandlerResult = MaybePromise<void>;

export type PreInterceptorResult = MaybePromise<boolean>;
export type PostInterceptorResult = MaybePromise<void>;

export type RequestHandler<CTX extends RequestCtx = RequestCtx> =
	| Fn<CTX, HandlerResult>
	| InterceptedRequestHandler<CTX>;

export interface InterceptedRequestHandler<
	CTX extends RequestCtx = RequestCtx
> {
	fn: Fn<CTX, HandlerResult>;
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
	intercept: Interceptor<CTX>[];
}

export interface CompiledHandler<CTX extends RequestCtx = RequestCtx> {
	fn: Fn<CTX, HandlerResult>;
	pre?: Maybe<Fn<CTX, PreInterceptorResult>>[];
	post?: Maybe<Fn<CTX, PostInterceptorResult>>[];
}

export interface Interceptor<CTX extends RequestCtx = RequestCtx> {
	/**
	 * Interceptor function which will be run BEFORE the main route handler (aka
	 * {@link InterceptedRequestHandler.fn}). If an interceptor needs to cancel
	 * the request processing it must return `false`. In this case any further
	 * pre-interceptors and the main handler will be skipped. In the post-phase,
	 * only the interceptors preceding the failed one will be run (though in
	 * reverse order). E.g. If the 3rd pre-interceptor failed, only the post
	 * phases of the first two will still be run (if available)...
	 */
	pre?: Fn<CTX, PreInterceptorResult>;
	/**
	 * Interceptor function which will be run AFTER the main route handler (aka
	 * {@link InterceptedRequestHandler.fn}). Post-interceptors cannot cancel
	 * request processing and are mainly intended for logging or clean-up
	 * purposes. Post interceptors
	 */
	post?: Fn<CTX, PostInterceptorResult>;
}

export interface ServerSession {
	/**
	 * Unique session ID
	 */
	id: string;
	/**
	 * Client's remote IP address when session was originally created. To
	 * counteract session fixation, each request's remote address is being
	 * checked (by {@link SessionInterceptor.pre}) against this stored address.
	 * If there's a mismatch between the two, then a new session will be
	 * generated automatically.
	 */
	ip: string;
}

export interface ISessionStore<T extends ServerSession = ServerSession> {
	/**
	 * Attempts to retrieve the session for given `id`.
	 *
	 * @param id
	 */
	get(id: string): MaybePromise<Maybe<T>>;
	/**
	 * Adds given `session` to underlying storage.
	 *
	 * @param session
	 */
	set(session: T): MaybePromise<boolean>;
	/**
	 * Attempts to delete the session for given `id` from storage. Returns true
	 * if successful.
	 *
	 * @param id
	 */
	delete(id: string): MaybePromise<boolean>;
	/**
	 * Configured Time-To-Live for stored sessions. Will also be used to
	 * configure the `max-age` attribute of the session ID cookie.
	 */
	readonly ttl: number;
}
