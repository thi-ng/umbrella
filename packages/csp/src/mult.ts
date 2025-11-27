// SPDX-License-Identifier: Apache-2.0
import type { IClosable, IWriteable } from "./api.js";
import { Channel } from "./channel.js";
import { __nextID } from "./idgen.js";

/**
 * Syntax sugar for {@link Mult} ctor. Creates a new `Mult` which allows
 * multiple child subscriptions, each receiving the same values written to (or
 * received by) the Mult itself, i.e. it acts as a channel splitter, supporting
 * dynamic subscriptions and unsubscriptions.
 *
 * @remarks
 * If `src` is a channel, it will be used as input. If given a string, a new
 * channel with the given ID will be created (for receiving values).
 *
 * @param arg
 */
export const mult = <T>(arg?: string | Channel<T>) => new Mult<T>(arg);

export class Mult<T> implements IWriteable<T>, IClosable {
	protected src: Channel<any>;
	protected taps: Channel<any>[] = [];

	/**
	 * See {@link mult} for reference.
	 *
	 * @param arg
	 */
	constructor(arg?: string | Channel<T>) {
		let id, src;
		if (typeof arg === "string") {
			id = arg;
		} else {
			src = arg;
		}
		this.src =
			src instanceof Channel
				? src
				: new Channel<T>({ id: id ?? `mult${__nextID()}` });
		this.process();
	}

	writable() {
		return this.src.writable();
	}

	write(val: T) {
		return this.src.write(val);
	}

	close() {
		return this.src.close();
	}

	closed() {
		return this.src.closed();
	}

	/**
	 * Attaches (and possibly creates) a new subscription channel to receive any
	 * values received by the `Mult` itself. Returns it.
	 *
	 * @remarks
	 * The channel can later be detached again via {@link Mult.unsubscribe}.
	 *
	 * @param ch
	 */
	subscribe(ch?: Channel<T>) {
		if (!ch) {
			ch = new Channel({
				id: `${this.src.id}-tap${__nextID()}`,
			});
		} else if (this.taps.includes(ch)) {
			return ch;
		}
		this.taps.push(ch);
		return ch;
	}

	/**
	 * Attempts to remove given subscription channel. Returns true if
	 * successful. If `close` is true (default), the given channel will also be
	 * closed (only if unsubscription was successful).
	 *
	 * @remarks
	 * See {@link Mult.subscribe} for reverse op.
	 *
	 * @param ch
	 * @param close
	 */
	unsubscribe(ch: Channel<T>, close = true) {
		const idx = this.taps.indexOf(ch);
		if (idx >= 0) {
			this.taps.splice(idx, 1);
			close && ch.close();
			return true;
		}
		return false;
	}

	/**
	 * Removes all child subscription channels and if `close` is true (default)
	 * also closes them.
	 *
	 * @remarks
	 * The `Mult` itself will remain active and will continue to accept new
	 * subscriptions.
	 *
	 * @param close
	 */
	unsubscribeAll(close = true) {
		if (close) {
			for (const t of this.taps) t.close();
		}
		this.taps.length = 0;
	}

	protected async process() {
		let x;
		while ((x = await this.src.read()) !== undefined) {
			for (const t of this.taps) {
				if (!(await t.write(x))) {
					this.unsubscribe(t);
				}
			}
			x = null;
		}
		this.unsubscribeAll();
	}
}
