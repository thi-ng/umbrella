// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Maybe } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { randomID } from "@thi.ng/random/random-id";

export class Lock {
	protected token: Maybe<string>;
	protected queue: Fn0<void>[] = [];

	/**
	 * Attempts to obtain the lock or adds the request to a wait queue. Returns
	 * promise which resolves with a unique token when the lock has been
	 * obtained. The token then has to be handed to {@link Lock.release} later.
	 */
	async acquire() {
		const token = randomID(8);
		if (!this.token) {
			this.token = token;
			return token;
		} else {
			return new Promise<string>((resolve) =>
				this.queue.push(() => {
					this.token = token;
					resolve(token);
				})
			);
		}
	}

	/**
	 * Attempts to release the lock and if successful also allows it to be
	 * acquited by the next waiting requester. The lock can only be released if
	 * the given ID matches the lock's current token.
	 */
	async release(id: string) {
		assert(
			this.token === id,
			`lock out of sync, expected ID: ${this.token}, got ${id}`
		);
		this.token = undefined;
		if (this.queue.length) this.queue.shift()!();
	}

	/**
	 * Calls given `fn` after aquiring the lock, and then releasing it again
	 * after the function returned. Returns promise of the functions result.
	 *
	 * @param fn
	 */
	async callWithLock<T>(fn: Fn0<T>) {
		const id = await this.acquire();
		try {
			return fn();
		} finally {
			this.release(id);
		}
	}
}
