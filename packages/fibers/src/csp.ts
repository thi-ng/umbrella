import type { Maybe } from "@thi.ng/api";
import type { IReadWriteBuffer } from "@thi.ng/buffers";
import { DroppingBuffer } from "@thi.ng/buffers/dropping";
import { FIFOBuffer } from "@thi.ng/buffers/fifo";
import { LIFOBuffer } from "@thi.ng/buffers/lifo";
import { SlidingBuffer } from "@thi.ng/buffers/sliding";
import { isNumber } from "@thi.ng/checks/is-number";
import type { FiberOpts } from "./api.js";
import { Fiber, fiber } from "./fiber.js";

const STATE_OPEN = 0;
const STATE_CLOSING = 1;
const STATE_CLOSED = 2;

export type CSPState =
	| typeof STATE_OPEN
	| typeof STATE_CLOSING
	| typeof STATE_CLOSED;

/**
 * Fiber-based CSP channel implementation, supporting any
 * [IReadWriteBuffer](https://docs.thi.ng/umbrella/buffers/interfaces/IReadWriteBuffer.html)
 * implementation to customize read/write behaviors (and ordering). By default
 * uses a single value {@link fifo} buffer impl.
 */
export class Channel<T> {
	protected buffer: IReadWriteBuffer<T>;
	protected state: CSPState = STATE_OPEN;

	constructor(
		buffer: IReadWriteBuffer<T> | number = 1,
		public opts?: Partial<FiberOpts>
	) {
		this.buffer = isNumber(buffer) ? new FIFOBuffer(buffer) : buffer;
	}

	/**
	 * Returns a new fiber which attempts to read a value from the channel and
	 * "blocks" until that value is available. Unless the channel has meanwhile
	 * been closed, the fiber returns the read value (otherwise: `undefined`).
	 *
	 * @remarks
	 * Depending on chosen back buffer behavior/implementation and
	 * {@link Channel.close}, read requests might still be successful whilst the
	 * channel is closing and there're still buffered values.
	 *
	 * @example
	 * ```ts
	 * const val = yield* chan.read();
	 * ```
	 */
	read() {
		// eslint-disable-next-line no-this-alias -- channel ref for child fiber
		const chan = this;
		return fiber<Maybe<T>>(function* (ctx: Fiber) {
			while (chan.readable()) {
				// wait until channel is readable
				if (chan.buffer.readable()) {
					const val = chan.buffer.read();
					ctx.logger?.debug("read", val);
					return val;
				} else if (chan.state === STATE_CLOSING) {
					return;
				}
				yield;
			}
		}, this.opts);
	}

	/**
	 * Returns a new fiber which attempts to write the given `value` to the
	 * channel and "blocks" until channel is writable (which depends on the
	 * channel's buffer implementation).
	 *
	 * @remarks
	 * Once the channel has been closed (or still is closing, see
	 * {@link Channel.close}), all write requests will be silently ignored.
	 *
	 * @example
	 * ```ts
	 * yield* chan.write(23);
	 * ```
	 */
	write(val: T) {
		// eslint-disable-next-line no-this-alias -- channel ref for child fiber
		const chan = this;
		return fiber(function* (ctx: Fiber) {
			while (chan.writable()) {
				// wait until channel is writable
				if (chan.buffer.writable()) {
					ctx.logger?.debug("write", val);
					chan.buffer.write(val);
					return;
				}
				yield;
			}
		}, this.opts);
	}

	/**
	 * Returns new fiber which closes the channel. By default this op will defer
	 * the full closing until all buffered values have been read (by another
	 * fiber), however any writes will already become unavailable/ignored even
	 * at this stage (also see {@link Channel.write}). If `wait=false`, the
	 * channel will be closed immediately, the backing buffered cleared and any
	 * in-flight reads or writes will be canceled.
	 *
	 * @param wait
	 */
	close(wait = true) {
		// eslint-disable-next-line no-this-alias -- channel ref for child fiber
		const chan = this;
		return fiber(function* (ctx: Fiber) {
			if (chan.state >= STATE_CLOSING) return;
			if (wait) {
				ctx.logger?.debug("waiting to close...");
				chan.state = STATE_CLOSING;
				while (chan.buffer.readable()) yield;
			}
			chan.state = STATE_CLOSED;
			chan.buffer.clear();
			ctx.logger?.debug("channel closed");
		}, this.opts);
	}

	/**
	 * Returns true if the channel is principally readable (i.e. not yet
	 * closed), however there might not be any values available yet and reads
	 * might block.
	 */
	readable() {
		return this.state <= STATE_CLOSING;
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
}

/**
 * Functional syntax sugar for {@link Channel} ctor, using provided backing
 * buffer and shared options for all fibers returned by the channel for its
 * various operations.
 *
 * @remarks
 * If `buffer` is given as number, a {@link fifo} buffer of given capacity will
 * be used.
 *
 * @example
 * ```ts
 * import { channel, sliding } from "@thi.ng/fibers";
 * import { ConsoleLogger } from "@thi.ng/logger";
 *
 * // create unbuffered channel with single value capacity
 * const chan = channel();
 *
 * // create channel with a fixed buffer capacity of 3 values
 * const chan2 = channel(3);
 *
 * // create channel with a sliding window buffer and custom ID & logger
 * const chan3 = channel(
 *   sliding(3),
 *   { id: "main", logger: new ConsoleLogger("chan") }
 * );
 * ```
 *
 * @param buffer
 * @param opts
 */
export const channel = <T>(
	buffer?: IReadWriteBuffer<T> | number,
	opts?: Partial<FiberOpts>
) => new Channel<T>(buffer, opts);

/**
 * Returns a {@link FIFOBuffer} ring buffer with given capacity for use with
 * {@link channel}.
 *
 * @remarks
 * With this implementation, writes to the channel will only start blocking once
 * the buffer's capacity is reached, otherwise complete immediately. Likewise,
 * channel reads are non-blocking whilst there're more buffered values
 * available. Reads will only block if the buffer is empty.
 *
 * Also see {@link lifo}.
 *
 * @param cap
 */
export const fifo = <T>(cap: number) => new FIFOBuffer<T>(cap);

/**
 *  Returns a {@link LIFOBuffer} with given capacity for use with
 * {@link channel}.
 *
 * @remarks
 *  Write behavior is the same as with {@link fifo}, reads are in reverse order
 *  (as the name indicates), i.e. the last value written will be the first value
 *  read (i.e. stack behavior).
 *
 * @param cap
 */
export const lifo = <T>(cap: number) => new LIFOBuffer<T>(cap);

/**
 * Returns a {@link SlidingBuffer} with given capacity for use with
 * {@link channel}.
 *
 * @remarks
 * With this implementation, writes to the channel are **never** blocking!
 * Whilst the buffer is at full capacity, new writes will first expunge the
 * oldest buffered value (similar to [LRU
 * cache](https://github.com/thi-ng/umbrella/blob/develop/packages/cache/README.md#lru)
 * behavior). Read behavior is the same as for {@link fifo}.
 *
 * Also see {@link dropping} for alternative behavior.
 *
 * @param cap
 */
export const sliding = <T>(cap: number) => new SlidingBuffer<T>(cap);

/**
 * Returns a {@link DroppingBuffer} with given capacity for use with
 * {@link channel}.
 *
 * @remarks
 * With this implementation, writes to the channel are **never** blocking!
 * Whilst the buffer is at full capacity, new writes will be silently ignored.
 * Read behavior is the same as for {@link fifo}.
 *
 * Also see {@link sliding} for alternative behavior.
 *
 * @param cap
 */
export const dropping = <T>(cap: number) => new DroppingBuffer<T>(cap);
