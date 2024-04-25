import type { Fn, Maybe } from "@thi.ng/api";
import { fifo } from "@thi.ng/buffers/fifo";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ChannelBuffer, ChannelValue, IChannel } from "./api.js";
import { __nextID } from "./idgen.js";

export const MAX_READS = 1024;
export const MAX_QUEUE = 1024;

const STATE_OPEN = 0;
const STATE_CLOSING = 1;
const STATE_CLOSED = 2;

export interface ChannelOpts {
	id: string;
}

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
	races: Fn<Channel<T>, void>[] = [];
	protected state = STATE_OPEN;

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

	async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		while (this.state < STATE_CLOSED) {
			const x = await this.read();
			if (x !== undefined) yield x;
		}
	}

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

	poll(): Maybe<T> {
		const { reads, writes } = this;
		if (this.readable() && !reads.length && writes.readable()) {
			const [msg, write] = writes.read();
			write(true);
			this.updateQueue();
			return msg;
		}
	}

	write(msg: T) {
		return new Promise<boolean>((resolve) => {
			if (!this.writable()) {
				resolve(false);
				return;
			}
			const { reads, writes, races, queue } = this;
			const val: ChannelValue<T> = [msg, resolve];
			if (!(writes.writable() && writes.write(val))) {
				queue.length < MAX_QUEUE
					? queue.push(val)
					: illegalState(
							"max. queue capacity reached, reduce back pressure!"
					  );
			}
			if (reads.length) {
				this.deliver();
			} else if (races.length) {
				races.shift()!(this);
			}
		});
	}

	offer(msg: T) {
		if (this.writable() && this.writes.writable()) {
			this.write(msg);
			return true;
		}
		return false;
	}

	race() {
		return new Promise<Channel<T>>((resolve) => {
			if (!this.readable()) {
				resolve(this);
				return;
			}
			this.races.push(resolve);
			if (this.writes.readable()) {
				this.races.shift()!(this);
			}
		});
	}

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
		while (races.length) races.shift()!(this);
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
	 */
	closed() {
		return this.state === STATE_CLOSED;
	}

	protected deliver() {
		const { reads, writes } = this;
		const [msg, write] = writes.read();
		write(true);
		reads.shift()!(msg);
		this.updateQueue();
	}

	protected updateQueue() {
		const { queue, writes } = this;
		// move item from queue to write buffer
		if (queue.length && writes.writable()) {
			writes.write(queue.shift()!);
		}
		if (this.state === STATE_CLOSING && !writes.readable()) {
			this.state = STATE_CLOSED;
		}
	}
}
