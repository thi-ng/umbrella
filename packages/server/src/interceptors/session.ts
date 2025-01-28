import type { Fn } from "@thi.ng/api";
import { TLRUCache } from "@thi.ng/cache";
import { uuid } from "@thi.ng/uuid";
import * as http from "node:http";
import type { Interceptor, RequestCtx } from "../api.js";

export interface SessionOpts<T extends ServerSession> {
	/**
	 * Factory function to create a new session object. By default the object
	 * only contains a {@link ServerSession.id} (UUID v4).
	 */
	factory: Fn<RequestCtx, T>;
	/**
	 * Initial record of active sessions (none by default).
	 */
	initial: Record<string, T>;
	/**
	 * Session cookie name
	 *
	 * @defaultValue "__sid"
	 */
	cookieName?: string;
	/**
	 * Additional session cookie config options.
	 *
	 * @defaultValue "Secure;HttpOnly;SameSite=Strict;Path=/"
	 */
	cookieOpts?: string;
	/**
	 * Session timeout in seconds.
	 *
	 * @defaultValue 3600
	 */
	ttl?: number;
}

export interface ServerSession {
	id: string;
	flash?: FlashMsg;
}

export interface FlashMsg {
	type: "success" | "info" | "warn" | "error";
	body: any;
}

export interface SessionInterceptor extends Interceptor {
	/**
	 * Adds configured session cookie to response.
	 *
	 * @param res
	 * @param sessionID
	 */
	withSession(
		res: http.ServerResponse,
		sessionID: string
	): http.ServerResponse;
}

export const serverSession = <T extends ServerSession>(
	opts: Partial<SessionOpts<T>> = {}
): SessionInterceptor => {
	const factory = opts.factory ?? (() => ({ id: uuid() }));
	const ttl = opts.ttl ?? 3600;
	const cookieName = opts.cookieName ?? "__sid";
	const cookieOpts =
		`Max-Age=${ttl};` +
		(opts.cookieOpts ?? "Secure;HttpOnly;SameSite=Strict;Path=/");
	const sessions = new TLRUCache<string, ServerSession>(
		opts.initial ? Object.entries(opts.initial) : null,
		{
			ttl: ttl * 1000,
			autoExtend: true,
		}
	);
	return {
		pre(ctx) {
			const { res, logger, cookies } = ctx;
			let id = cookies?.[cookieName];
			let session = id ? sessions.get(id) : undefined;
			if (!session) {
				session = factory(ctx);
				logger.info("new session", session);
				sessions.set(session.id, session);
			}
			ctx.session = session;
			this.withSession(res, session.id);
			return true;
		},

		withSession: (res: http.ServerResponse, sessionID: string) =>
			res.appendHeader(
				"set-cookie",
				`${cookieName}=${sessionID};${cookieOpts}`
			),
	};
};
