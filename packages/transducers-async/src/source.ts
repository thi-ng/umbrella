import type { Fn, FnO, IDeref, Maybe } from "@thi.ng/api";
import type { IReadWriteBuffer } from "@thi.ng/buffers";
import { fifo } from "@thi.ng/buffers/fifo";
import { isNumber } from "@thi.ng/checks/is-number";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ClosableAsyncGenerator } from "./api.js";

export interface Source<T> extends ClosableAsyncGenerator<T>, IDeref<Maybe<T>> {
	/**
	 * Writes or queues given value `x` to be asynchronously passed down to the
	 * source's consumer. If no other values are queued yet, the source
	 * processes it immediately, otherwise the value will be first added to the
	 * source's configured buffer.
	 *
	 * @remarks
	 * Once {@link Source.close} has been called, all future write attempts will
	 * be silently ignored.
	 *
	 * @param x
	 */
	write(x?: T): void;
	/**
	 * Returns the most recently produced/yielded value (if any). If there's
	 * back pressure (i.e. queued values caused by more frequent writes and than
	 * reads, the returned value is **not** necessarily the last value written
	 * via {@link Source.write}). Returns `undefined`, if no value has yet been
	 * written or the source has already been fully closed (via
	 * {@link Source.close}).
	 */
	deref(): Maybe<T>;
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
 * The `source()` stores the last produced/yielded value (not necessarily the
 * last value written via {@link Source.write}), which can be read via
 * {@link Source.deref} or updated via {@link Source.update}.
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
 * src.write(23);
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
	let state = 0;
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
		state = 2;
	})();
	gen.write = (x) => {
		// don't accept new values if already closing
		if (state > 0) return;
		if (resolve) {
			resolve(x);
			resolve = undefined;
		} else if (queue.writable()) {
			queue.write(x);
			if (x === undefined) state = 1;
		} else illegalState("buffer overflow");
	};
	gen.update = (fn, ...args: any[]) => gen.write(fn(last, ...args));
	gen.close = () => gen.write(undefined);
	gen.deref = () => last;
	if (initial !== undefined) gen.write(initial);
	return gen;
};
