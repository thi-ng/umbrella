// SPDX-License-Identifier: Apache-2.0
import type { Fn, Maybe } from "@thi.ng/api";
import { isNumber, isString } from "@thi.ng/checks";
import { uuid } from "@thi.ng/uuid";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { ServerResponse } from "node:http";
import type {
	Interceptor,
	ISessionStore,
	RequestCtx,
	ServerSession,
} from "../api.js";
import { inMemorySessionStore } from "./memory.js";

/**
 * Configuration options for {@link SessionInterceptor}.
 */
export interface SessionOpts<
	CTX extends RequestCtx = RequestCtx,
	SESSION extends ServerSession = ServerSession
> {
	/**
	 * Factory function to create a new session object. See
	 * {@link createSession} for a base implementation.
	 */
	factory: Fn<CTX, SESSION>;
	/**
	 * Session storage implementation. Default: {@link InMemorySessionStore}.
	 */
	store?: ISessionStore<SESSION>;
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
	 * HMAC key/secret used for signing cookies (using SHA256). Max length 64
	 * bytes. If given as number, generates N random bytes.
	 */
	secret?: number | string | Buffer;
}

/**
 * Pre-interceptor which parses & validates session cookie (if available) from
 * current request and injects/updates session cookie in response. Only a signed
 * session ID will be stored in the cookie. Thr actual session data is held
 * server side, via configured session storage (see {@link SessionOpts.store})
 * (by default uses {@link InMemorySessionStore}).
 */
export class SessionInterceptor<
	CTX extends RequestCtx = RequestCtx,
	SESSION extends ServerSession = ServerSession
> implements Interceptor<CTX>
{
	factory: Fn<CTX, SESSION>;
	store: ISessionStore<SESSION>;
	cookieName: string;
	cookieOpts: string;
	secret: Buffer;

	constructor({
		factory,
		store = inMemorySessionStore<SESSION>(),
		cookieName = "__sid",
		cookieOpts = "Secure;HttpOnly;SameSite=Strict;Path=/",
		secret = 32,
	}: SessionOpts<CTX, SESSION>) {
		this.factory = factory;
		this.store = store;
		this.secret = isNumber(secret)
			? randomBytes(secret)
			: isString(secret)
			? Buffer.from(secret)
			: secret;
		this.cookieName = cookieName;
		this.cookieOpts = cookieOpts;
	}

	async pre(ctx: CTX) {
		const cookie = ctx.cookies?.[this.cookieName];
		let id: Maybe<string>;
		if (cookie) {
			id = this.validateSession(cookie);
			if (!id) {
				ctx.res.forbidden();
				return false;
			}
		}
		let session = id ? await this.store.get(id) : undefined;
		if (!session || session.ip !== ctx.req.socket.remoteAddress) {
			session = await this.newSession(ctx);
			if (!session) return false;
		}
		ctx.session = session;
		this.withSession(ctx.res, session.id);
		return true;
	}

	/**
	 * Attempts to delete session for given ID and if successful also sets
	 * force-expired cookie in response.
	 *
	 * @remarks
	 * Intended for logout handlers and/or switching sessions when a user has
	 * successfully authenticated (to avoid session fixation).
	 *
	 * @param ctx
	 * @param sessionID
	 */
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

	/**
	 * Creates a new session object (via configured {@link SessionOpts.factory})
	 * and submits it to configured {@link SessionOpts.store}, Returns session
	 * if successful, otherwise returns `undefined`.
	 *
	 * @param ctx
	 */
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
		const cookie = sessionID + ":" + randomBytes(8).toString("base64url");
		const signature = createHmac("sha256", this.secret)
			.update(cookie, "ascii")
			.digest()
			.toString("base64url");
		return res.appendHeader(
			"set-cookie",
			`${this.cookieName}=${cookie}:${signature};Max-Age=${this.store.ttl};${this.cookieOpts}`
		);
	}

	validateSession(cookie: string) {
		const parts = cookie.split(":");
		if (parts.length < 3) return;
		const actual = Buffer.from(parts[2], "base64url");
		const expected = createHmac("sha256", this.secret)
			.update(
				cookie.substring(0, cookie.length - parts[2].length - 1),
				"ascii"
			)
			.digest();
		const sameLength = actual.length === expected.length;
		return timingSafeEqual(sameLength ? actual : expected, expected) &&
			sameLength
			? parts[0]
			: undefined;
	}
}

/**
 * Factory function to create a new {@link SessionInterceptor} instance
 * configured with given options.
 *
 * @param opts
 */
export const sessionInterceptor = <
	CTX extends RequestCtx = RequestCtx,
	SESSION extends ServerSession = ServerSession
>(
	opts: SessionOpts<CTX, SESSION>
) => new SessionInterceptor(opts);

/**
 * Creates a new basic {@link ServerSession}, using a UUID v4 for
 * {@link ServerSession.id}.
 *
 * @remarks
 * Intended to be used for {@link SessionOpts.factory} and/or as basis for
 * creating custom session objects.
 *
 * @param ctx
 */
export const createSession = (ctx: RequestCtx) =>
	<ServerSession>{
		id: uuid(),
		ip: ctx.req.socket.remoteAddress,
	};
