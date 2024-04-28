import type { Fn2, Maybe } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { IClosable, IWriteable } from "./api.js";
import { Channel } from "./channel.js";

export const broadcast = async <T>(
	src: Channel<T>,
	dest: Channel<T>[],
	close = true
) => {
	for await (let x of src) {
		for (let chan of dest) chan.write(x);
	}
	if (close) {
		for (let chan of dest) chan.close();
	}
};

export const concat = async <T>(
	dest: IWriteable<T> & IClosable,
	chans: Iterable<Channel<T>>,
	close = true
) => {
	return (async () => {
		for (let c of chans) {
			await consumeWith(c, (x: T) => dest.write(x));
		}
		close && dest.close();
	})();
};

/**
 * Consumes & collects all queued and future values written to channel `chan`
 * until closed or the max. number of values has been collected (whatever comes
 * first). Returns a promise of the result array.
 *
 * @param chan
 * @param res
 * @param num
 */
export const consume = async <T>(
	chan: Channel<T>,
	res: T[] = [],
	num = Infinity
) => {
	for (let n = 0; !chan.closed() && n < num; n++) {
		const x = await chan.read();
		if (x == undefined) break;
		res.push(x);
	}
	return res;
};

/**
 * Consumes all queued and future values written to channel `chan` until closed
 * or the max. number of values has been reached (whatever comes first). Calls
 * `fn` with each value read (presumably for side effects). Returns a void
 * promise which resolves when the consumer is done.
 *
 * @param chan
 * @param fn
 * @param num
 */
export const consumeWith = async <T>(
	chan: Channel<T>,
	fn: Fn2<T, Channel<T>, void>,
	num = Infinity
) => {
	for (let n = 0; !chan.closed() && n < num; n++) {
		const x = await chan.read();
		if (x == undefined) break;
		fn(x, chan);
	}
};

/**
 * Similar to {@link consume}, but only processes any current in-flight writes
 * and returns a promise with an array of their values.
 *
 * @param chan
 */
export const drain = async <T>(chan: Channel<T>) =>
	await (async () => {
		const ops: Promise<T>[] = [];
		for (
			let i = 0, n = chan.writes.length + chan.queue.length;
			i < n;
			i++
		) {
			ops.push(<Promise<T>>chan.read());
		}
		return Promise.all(ops);
	})();

/**
 * Takes an async iterable and returns a new CSP {@link Channel}, which receives
 * all values from `src`. If `close` is true (default), the channel will be
 * automatically closed once the iterable is exhausted.
 *
 * @param src
 * @param close
 */
export const fromAsyncIterable = <T>(src: AsyncIterable<T>, close = true) => {
	const chan = new Channel<T>();
	(async () => {
		for await (let x of src) {
			await chan.write(x);
			if (!chan.writable()) break;
		}
		close && chan.close();
	})();
	return chan;
};

export const merge = <T>(
	src: Channel<T>[],
	dest?: Channel<T>,
	close = true
) => {
	assert(src.length > 0, "no inputs given");
	dest = dest || new Channel<T>();
	(async () => {
		while (true) {
			const [x, ch] = await select(...(<[Channel<T>]>src));
			if (x === undefined) {
				src.splice(src.indexOf(ch), 1);
				if (!src.length) {
					close && dest.close();
					break;
				}
			} else {
				await dest.write(x);
			}
		}
	})();
	return dest;
};

export const into = async <T, DEST extends IWriteable<T> & IClosable>(
	chan: DEST,
	src: Iterable<T> | AsyncIterable<T>,
	close = false
) => {
	for await (let x of src) {
		if (!chan.writable()) break;
		await chan.write(x);
	}
	close && chan.close();
};

export const pipe = <T, DEST extends IWriteable<T> & IClosable>(
	src: Channel<T>,
	dest: DEST,
	close = true
) => {
	(async () => {
		for await (let x of src) {
			await dest.write(x);
			if (!dest.writable()) break;
		}
		close && dest.close();
	})();
	return dest;
};

/**
 * Takes one or more input channels and attempts to read from all of them at
 * once (via {@link Channel.race}, a blocking op). Returns a promise which
 * resolves once one of the inputs becomes available or was closed, selects that
 * channel to read from it and returns tuple of `[value, channel]`.
 *
 * @param input
 * @param xs
 */
export const select = async <T>(
	input: Channel<T>,
	...xs: Channel<T>[]
): Promise<[Maybe<T>, Channel<T>]> => {
	const inputs = [input, ...xs];
	const sel = await Promise.race(inputs.map((x) => x.race()));
	for (let chan of inputs) {
		if (chan !== sel) chan.races.shift();
	}
	if (sel.writes.readable()) {
		const [msg, write] = sel.writes.read();
		write(true);
		sel.updateQueue();
		return [msg, sel];
	}
	return [undefined, sel];
};

/**
 * Returns a new {@link Channel} which will automatically close after `delay`
 * milliseconds.
 *
 * @remarks
 * Intended as utility for enforcing a timeout for {@link select}-style
 * operations.
 *
 * @param delay
 */
export const timeout = (delay: number) => {
	const ch = new Channel<any>();
	setTimeout(() => ch.close(), delay);
	return ch;
};
