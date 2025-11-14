// SPDX-License-Identifier: Apache-2.0
import { TLRUCache } from "@thi.ng/cache";
import type { ISessionStore, ServerSession } from "../api.js";

export interface InMemorySessionOpts<T extends ServerSession = ServerSession> {
	/**
	 * Session timeout in seconds.
	 *
	 * @defaultValue 3600
	 */
	ttl: number;
	/**
	 * If true (default), a session's cache span automatically extends by
	 * {@link InMemorySessionOpts.ttl} with each request. If false, the session
	 * auto-expires after TTL since session creation.
	 *
	 * @defaultValue true
	 */
	autoExtend: boolean;
	/**
	 * Initial record of active sessions (none by default).
	 */
	initial: Record<string, T>;
}

/**
 * Session storage implementation for use with {@link sessionInterceptor}, using
 * an in-memory TLRU Cache with configurable TTL.
 */
export class InMemorySessionStore<T extends ServerSession = ServerSession>
	implements ISessionStore<T>
{
	readonly ttl: number;
	protected sessions: TLRUCache<string, T>;

	constructor({
		ttl = 3600,
		autoExtend = true,
		initial,
	}: Partial<InMemorySessionOpts<T>> = {}) {
		this.ttl = ttl;
		this.sessions = new TLRUCache<string, T>(
			initial ? Object.entries(initial) : null,
			{
				ttl: ttl * 1000,
				autoExtend,
			}
		);
	}

	get(id: string) {
		return this.sessions.get(id);
	}

	set(session: T) {
		this.sessions.set(session.id, session);
		return true;
	}

	delete(id: string) {
		return this.sessions.delete(id);
	}
}

/**
 * Factory function for creating a new {@link InMemorySessionStore}.
 *
 * @param opts
 */
export const inMemorySessionStore = <T extends ServerSession = ServerSession>(
	opts?: Partial<InMemorySessionOpts<T>>
) => new InMemorySessionStore(opts);
