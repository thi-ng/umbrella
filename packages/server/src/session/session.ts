import type { Fn } from "@thi.ng/api";
import { uuid } from "@thi.ng/uuid";
import { ServerResponse } from "node:http";
import type {
	Interceptor,
	ISessionStore,
	RequestCtx,
	ServerSession,
} from "../api.js";
import { inMemorySessionStore } from "./memory.js";

export interface SessionOpts<
	CTX extends RequestCtx = RequestCtx,
	SESSION extends ServerSession = ServerSession
> {
	/**
	 * Session storage implementation. Default: {@link InMemorySessionStore}.
	 */
	store: ISessionStore<SESSION>;
	/**
	 * Factory function to create a new session object. By default the object
	 * only contains a {@link ServerSession.id} (UUID v4).
	 */
	factory: Fn<CTX, SESSION>;
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
}

export class SessionInterceptor<
	CTX extends RequestCtx = RequestCtx,
	SESSION extends ServerSession = ServerSession
> implements Interceptor<CTX>
{
	store: ISessionStore<SESSION>;
	factory: Fn<CTX, SESSION>;
	cookieName: string;
	cookieOpts: string;

	constructor({
		store = inMemorySessionStore<SESSION>(),
		factory = (ctx) =>
			<SESSION>{
				id: uuid(),
				ip: ctx.req.socket.remoteAddress,
			},
		cookieName = "__sid",
		cookieOpts = "Secure;HttpOnly;SameSite=Strict;Path=/",
	}: Partial<SessionOpts<CTX, SESSION>> = {}) {
		this.store = store;
		this.factory = factory;
		this.cookieName = cookieName;
		this.cookieOpts = cookieOpts;
	}

	async pre(ctx: CTX) {
		const id = ctx.cookies?.[this.cookieName];
		let session = id ? await this.store.get(id) : undefined;
		if (!session || session.ip !== ctx.req.socket.remoteAddress) {
			session = await this.newSession(ctx);
			if (!session) return false;
		}
		ctx.session = session;
		this.withSession(ctx.res, session.id);
		return true;
	}

	async deleteSession(ctx: CTX, sessionID: string) {
		if (await this.store.delete(sessionID)) {
			ctx.logger.info("delete session:", sessionID);
			ctx.session = undefined;
			ctx.res.appendHeader(
				"set-cookie",
				`${this.cookieName}=;Expires=Thu, 01 Jan 1970 00:00:00 GMT;${this.cookieOpts}`
			);
		}
	}

	async newSession(ctx: CTX) {
		const session = this.factory(ctx);
		ctx.logger.info("new session:", session.id);
		if (!(await this.store.set(session))) {
			ctx.logger.warn("could not store session...");
			return;
		}
		return session;
	}

	/**
	 * Calls {@link SessionInterceptor.newSession} to create a new session and,
	 * if successful, associates it with current context & response. Deletes
	 * existing session (if any). Returns new session object.
	 *
	 * @param ctx
	 */
	async replaceSession(ctx: CTX) {
		const session = await this.newSession(ctx);
		if (session) {
			if (ctx.session?.id) this.store.delete(ctx.session.id);
			ctx.session = session;
			this.withSession(ctx.res, session.id);
			return session;
		}
	}

	withSession(res: ServerResponse, sessionID: string) {
		return res.appendHeader(
			"set-cookie",
			`${this.cookieName}=${sessionID};Max-Age=${this.store.ttl};${this.cookieOpts}`
		);
	}
}

/**
 * Factory function to create a new {@link SessionInterceptor} instance.
 *
 * @param opts
 */
export const serverSession = <
	CTX extends RequestCtx = RequestCtx,
	SESSION extends ServerSession = ServerSession
>(
	opts?: Partial<SessionOpts<CTX, SESSION>>
) => new SessionInterceptor(opts);
