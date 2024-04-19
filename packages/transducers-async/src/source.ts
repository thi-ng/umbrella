import type { Fn, FnO, IDeref, Maybe } from "@thi.ng/api";
import type { IReadWriteBuffer } from "@thi.ng/buffers";
import { fifo } from "@thi.ng/buffers/fifo";
import { isNumber } from "@thi.ng/checks/is-number";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ClosableAsyncGenerator } from "./api.js";

export interface Source<T> extends ClosableAsyncGenerator<T>, IDeref<Maybe<T>> {
	/**
	 * Queues given value `x` to be asynchronously passed down by the source to
	 * its consumer. If no other values are queued yet, the source processes it
	 * immediately.
	 *
	 * @param x
	 */
	reset(x?: T): void;
	/**
	 * Takes a function which will be called with the most recent emitted value
	 * of the source (plus any optionally given args) and queues the result of
	 * that function as new value to be asynchronously passed down by the source
	 * to its consumer.
	 *
	 * @remarks
	 * Only use this function in situations where there's no back pressure (i.e.
	 * no queued up values).
	 *
	 * @param fn
	 * @param args
	 */
	update(fn: FnO<Maybe<T>, Maybe<T>>, ...args: any[]): void;
}

/**
 * Creates an async iterable acting as data source with an extended API to
 * externally feed/write new values, which are then passed downstream to any
 * attached processors/transducers. The source can use an optional buffer
 * implementation to control back pressure behavior and value ordering.
 *
 * @remarks
 * See [thi.ng/buffers](https://thi.ng/buffers) for available buffer
 * implementations. By default a
 * [`fifo()`](https://docs.thi.ng/umbrella/buffers/functions/fifo.html) buffer
 * with capacity=1 is used.
 *
 * If `initial` is given, the source will immediately deliver this value once a
 * consumer is attached.
 *
 * The `source()` stores the last produced/yielded value, which can be read via
 * `.deref()` or updated via `.update()`.
 *
 * @example
 * ```ts tangle:../export/source.ts
 * import { source, map, run } from "@thi.ng/transducers-async";
 *
 * // create empty source
 * const src = source();
 *
 * // create an async consumer
 * // (consumer stops when we close the source)
 * run(
 *   map(async (x) => x * 10),
 *   (x) => console.log("result:", x),
 *   src
 * )
 *
 * // set new value
 * src.reset(23);
 * // result: 230
 *
 * // update last value
 * // (delayed invocation here to avoid buffer overflow)
 * setTimeout(() => src.update((x) => x + 1), 0);
 * // result: 240
 *
 * // close/terminate source
 * setTimeout(() => src.close(), 0);
 * ```
 *
 * @param initial
 * @param buffer
 */
export const source = <T>(
	initial?: T,
	buffer: IReadWriteBuffer<Maybe<T>> | number = 1
) => {
	const queue = isNumber(buffer) ? fifo<Maybe<T>>(buffer) : buffer;
	let last: Maybe<T> = initial;
	let isClosed = false;
	let promise: Promise<Maybe<T>>;
	let resolve: Maybe<Fn<Maybe<T>, void>>;
	const newPromise = () => {
		promise = new Promise<Maybe<T>>(($resolve) => {
			resolve = $resolve;
		});
	};
	newPromise();
	const gen = <Source<T>>(async function* () {
		while (true) {
			const val = await promise!;
			last = val;
			if (val === undefined) break;
			yield val;
			newPromise();
			if (queue.readable()) resolve!(queue.read());
		}
		isClosed = true;
	})();
	gen.reset = (x) => {
		if (isClosed) return;
		if (resolve) {
			resolve(x);
			resolve = undefined;
		} else if (queue.writable()) {
			queue.write(x);
		} else illegalState("buffer overflow");
	};
	gen.update = (fn, ...args: any[]) => gen.reset(fn(last, ...args));
	gen.close = () => gen.reset(undefined);
	gen.deref = () => last;
	if (initial !== undefined) gen.reset(initial);
	return gen;
};
