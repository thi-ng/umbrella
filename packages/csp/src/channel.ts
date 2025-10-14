// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn0, Maybe } from "@thi.ng/api";
import { fifo } from "@thi.ng/buffers/fifo";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ChannelBuffer, ChannelValue, IChannel } from "./api.js";
import { __nextID } from "./idgen.js";

export const MAX_READS = 1024;
export const MAX_WRITES = 1024;

const STATE_OPEN = 0;
const STATE_CLOSING = 1;
const STATE_CLOSED = 2;

export interface ChannelOpts {
	id: string;
}

export interface Race<T> {
	/**
	 * Parent channel this race belongs to.
	 */
	channel: Channel<T>;
	/**
	 * This race's promise. Will be resolved by the channel or can be rejected
	 * via {@link Race.abort}.
	 */
	promise: Promise<Channel<T>>;
	/**
	 * Aborts this race by rejecting its promise and removing the race from the
	 * parent channel's queue of ongoing races.
	 */
	abort: Fn0<void>;
	/** @internal */
	__resolve: Fn<Channel<T>, void>;
}

/**
 * Syntax sugar for creating a new CSP {@link Channel}. By default, the channel
 * has a buffer capacity of 1 value, but supports custom buffer sizes and/or
 * implementations (described in readme).
 *
 * @param opts
 */
export function channel<T>(opts?: Partial<ChannelOpts>): Channel<T>;
export function channel<T>(
	buf: ChannelBuffer<T> | number,
	opts?: Partial<ChannelOpts>
): Channel<T>;
export function channel(...args: any[]) {
	return new Channel(...args);
}

export class Channel<T> implements IChannel<T> {
	id: string;
	writes: ChannelBuffer<T>;
	queue: ChannelValue<T>[] = [];
	reads: Fn<Maybe<T>, void>[] = [];
	races: Race<T>[] = [];
	protected state = STATE_OPEN;

	/**
	 * See {@link channel} for reference.
	 *
	 * @param opts
	 */
	constructor(opts?: Partial<ChannelOpts>);
	constructor(buf: ChannelBuffer<T> | number, opts?: Partial<ChannelOpts>);
	constructor(...args: any[]) {
		let buf: ChannelBuffer<T> | number = 1;
		let opts: Maybe<Partial<ChannelOpts>>;
		switch (args.length) {
			case 1:
				if (isPlainObject(args[0])) opts = args[0];
				else buf = args[0];
				break;
			case 2:
				[buf, opts] = args;
				break;
		}
		this.writes = isNumber(buf) ? fifo(buf) : buf;
		this.id = opts?.id ?? `chan-${__nextID()}`;
	}

	/**
	 * Returns an async iterator of this channel, acting as adapter between the
	 * CSP world and the more generic ES async iterables. The iterator stops
	 * once the channel has been closed and no further values can be read.
	 *
	 * @remarks
	 * Multiple iterators will compete for new values. To ensure an iterator
	 * receives all of the channel's values, you must either ensure there's only
	 * a single iterator per channel or feed the channel into a {@link mult}
	 * first and create an iterator of a channel obtained via
	 * {@link Mult.subscribe}.
	 *
	 * @example
	 * ```ts tangle:../export/channel-iterator.ts
	 * import { channel } from "@thi.ng/csp";
	 *
	 * const chan = channel<number>();
	 *
	 * (async () => {
	 *   // implicit iterator conversion of the channel
	 *   for await(let x of chan) console.log("received", x);
	 *   console.log("channel closed");
	 * })()
	 *
	 * chan.write(1);
	 * chan.write(2);
	 * chan.write(3);
	 * chan.close();
	 * ```
	 */
	async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		while (this.state < STATE_CLOSED) {
			const x = await this.read();
			if (x !== undefined) yield x;
		}
	}

	/**
	 * Attempts to read a value from the channel. The returned promise will
	 * block until such value becomes available or if the channel has been
	 * closed in the meantime. In that latter case, the promise will resolve to
	 * `undefined`.
	 *
	 * @remarks
	 * If a value is already available at the time of the function call, the
	 * promise resolves immediately.
	 *
	 * Note: There's a limit of in-flight {@link MAX_READS} allowed per channel.
	 * The promise will reject if that number is exceeded.
	 *
	 * Also see {@link Channel.poll}.
	 */
	read() {
		return new Promise<Maybe<T>>((resolve) => {
			if (!this.readable()) {
				resolve(undefined);
				return;
			}
			// if closing only allow more reads if there're still in-flight writes
			if (this.state < STATE_CLOSING || this.writes.readable()) {
				// limit number of read requests
				if (this.reads.length < MAX_READS) {
					this.reads.push(resolve);
				} else {
					resolve(undefined);
				}
			}
			if (this.writes.readable()) this.deliver();
		});
	}

	/**
	 * Similar to {@link Channel.read}, but not async and non-blocking. Will
	 * only succeed if the channel is readable (i.e. not yet closed) and if a
	 * value can be read immediately (without waiting). Returns the value or
	 * `undefined` if unsuccessful.
	 *
	 * @remarks
	 * Use {@link Channel.closed} to check if the channel is already closed.
	 */
	poll(): Maybe<T> {
		const { reads, writes } = this;
		if (this.readable() && !reads.length && writes.readable()) {
			const [msg, write] = writes.read();
			write(true);
			this.updateQueue();
			return msg;
		}
	}

	/**
	 * Attempts to write a new value to the channel and returns a promise
	 * indicating success or failure. Depending on buffer capacity & behavior,
	 * the returned promise will block until the channel accept new values (i.e.
	 * until the next {@link Channel.read}) or if it has been closed in the
	 * meantime. In that latter case, the promise will resolve to false.
	 *
	 * @remarks
	 * If the channel's buffer accepts new writes or if a read op is already
	 * waiting at the time of the function call, the promise resolves
	 * immediately.
	 *
	 * If the buffer is already full, the write will be queued and only resolve
	 * when delivered. Note: As a fail-safe, there's a limit of queued
	 * {@link MAX_WRITES} allowed per channel. The promise will reject if that
	 * number is exceeded.
	 *
	 * Also see {@link Channel.offer}.
	 */
	write(msg: T) {
		return new Promise<boolean>((resolve) => {
			if (!this.writable()) {
				resolve(false);
				return;
			}
			const { reads, writes, races, queue } = this;
			const val: ChannelValue<T> = [msg, resolve];
			if (!(writes.writable() && writes.write(val))) {
				queue.length < MAX_WRITES
					? queue.push(val)
					: illegalState(
							"max. queue capacity reached, reduce back pressure!"
					  );
			}
			if (reads.length) {
				this.deliver();
			} else if (races.length) {
				races.shift()!.__resolve(this);
			}
		});
	}

	/**
	 * Similar to {@link Channel.write}, but not async and non-blocking. Will
	 * only succeed if the channel is writable (i.e. not yet closed/closing) and
	 * if a write is immediately possible (without queuing). Returns true, if
	 * successful.
	 *
	 * @param msg
	 */
	offer(msg: T) {
		if (this.writable() && this.writes.writable()) {
			this.write(msg);
			return true;
		}
		return false;
	}

	/**
	 * Queues and returns a {@link Race} operation, including a promise which
	 * resolves with the channel itself when the channel becomes readable, but
	 * no other queued read operations are waiting (which always have priority).
	 * If the channel is already closed, the promise resolves immediately. The
	 * race can be aborted via {@link Race.abort}, which also removes it from
	 * the channel's queue of ongoing races.
	 *
	 * @remarks
	 * This op is used internally by {@link select} to choose a channel to read
	 * from next.
	 */
	race() {
		const race: Race<T> = <any>{ channel: this };
		race.promise = new Promise<Channel<T>>((resolve, reject) => {
			race.__resolve = resolve;
			race.abort = () => {
				const index = this.races.indexOf(race);
				if (index >= 0) {
					this.races.splice(index, 1);
					reject(this);
				}
			};
			if (!this.readable()) {
				resolve(this);
				return;
			}
			this.races.push(race);
			if (this.writes.readable()) {
				this.races.shift()!.__resolve(this);
			}
		});
		return race;
	}

	/**
	 * Triggers closing of the channel (idempotent). Any queued writes remain
	 * readable, but new writes will be ignored.
	 *
	 * @remarks
	 * Whilst there're still values available for reading,
	 * {@link Channel.closed} will still return false since the channel state is
	 * still "closing", not yet fully "closed".
	 */
	close() {
		if (this.state >= STATE_CLOSING) return;
		const { reads, writes, races } = this;
		this.state =
			reads.length || writes.readable() ? STATE_CLOSING : STATE_CLOSED;
		// deliver outstanding
		while (reads.length && writes.readable()) this.deliver();
		// cancel remaining reads
		if (!writes.readable()) {
			while (reads.length) reads.shift()!(undefined);
		}
		this.state = writes.readable() ? STATE_CLOSING : STATE_CLOSED;
		while (races.length) races.shift()!.__resolve(this);
	}

	/**
	 * Returns true if the channel is principally readable (i.e. not yet
	 * closed), however there might not be any values available yet and reads
	 * might block.
	 */
	readable() {
		return this.state < STATE_CLOSED;
	}

	/**
	 * Returns true if the channel is principally writable (i.e. not closing or
	 * closed), however depending on buffer behavior the channel might not yet
	 * accept new values and writes might block.
	 */
	writable() {
		return this.state === STATE_OPEN;
	}

	/**
	 * Returns true if the channel is fully closed and no further reads or
	 * writes are possible.
	 *
	 * @remarks
	 * Whilst there're still values available for reading, this will still
	 * return false since the channel state is still "closing", not yet fully
	 * "closed".
	 */
	closed() {
		return this.state === STATE_CLOSED;
	}

	/** @internal */
	updateQueue() {
		const { queue, writes } = this;
		// move item from queue to write buffer
		if (queue.length && writes.writable()) {
			writes.write(queue.shift()!);
		}
		if (this.state === STATE_CLOSING && !writes.readable()) {
			this.state = STATE_CLOSED;
		}
	}

	protected deliver() {
		const { reads, writes } = this;
		const [msg, write] = writes.read();
		write(true);
		reads.shift()!(msg);
		this.updateQueue();
	}
}
