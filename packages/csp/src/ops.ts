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
 * Consumes & collects all future values written to channel `chan` until
 * closed or the max. number of values has been collected (whatever comes
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
		return [msg, sel];
	}
	return [undefined, sel];
};

export const timeout = (delay: number) => {
	const ch = new Channel<any>();
	setTimeout(() => ch.close(), delay);
	return ch;
};
