import { shuffle } from "@thi.ng/arrays/shuffle";
import { isPlainObject } from "@thi.ng/checks";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { Reducer, Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

export interface StreamShuffleOpts {
	/**
	 * Sliding window size
	 */
	n: number;
	/**
	 * Max. shuffle ops per new input (in [0..n] range)
	 *
	 * @defaultValue same as `n`
	 */
	max?: number;
	/**
	 * PRNG instance to use for shuffling
	 *
	 * @defaultValue SYSTEM
	 */
	rnd?: IRandom;
}

/**
 * Transducer. Creates internal sliding window of `n` values and performs
 * `maxSwaps` random shuffle operations for each new value and yields values in
 * shuffled order. By default `maxSwaps` is the same as the chosen chunk size.
 * If given a {@link StreamShuffleOpts} options object, further configurations
 * are possible.
 *
 * @example
 * ```ts
 * [...streamShuffle(5, range(10))]
 * // [ 3, 2, 5, 0, 8, 7, 1, 6, 4, 9 ]
 *
 * [...streamShuffle({ n: 5, rnd: new XsAdd(12345) }, range(10))]
 * [ 0, 4, 3, 7, 8, 1, 5, 2, 6, 9 ]
 * ```
 *
 * @param n - sliding window size
 * @param maxSwaps - number of swaps per input
 */
export function streamShuffle<T>(
	n: number,
	maxSwaps?: number
): Transducer<T, T>;
export function streamShuffle<T>(opts: StreamShuffleOpts): Transducer<T, T>;
export function streamShuffle<T>(
	opts: number | StreamShuffleOpts,
	src: Iterable<T>
): IterableIterator<T>;
export function streamShuffle<T>(
	n: number,
	maxSwaps: number,
	src: Iterable<T>
): IterableIterator<T>;
export function streamShuffle<T>(...args: any[]): any {
	return (
		__iter(streamShuffle, args, iterator) ||
		(([init, complete, reduce]: Reducer<any, T>) => {
			let n: number;
			let maxSwaps: number;
			let rnd: IRandom = SYSTEM;
			const opts = <StreamShuffleOpts>args[0];
			if (isPlainObject(opts)) {
				n = opts.n;
				maxSwaps = opts.max || n;
				opts.rnd && (rnd = opts.rnd);
			} else {
				n = args[0];
				maxSwaps = args[1] || n;
			}
			const buf: T[] = [];
			return <Reducer<any, T>>[
				init,
				(acc) => {
					if (buf.length) {
						shuffle(buf, Math.min(maxSwaps, buf.length), rnd);
						for (
							let i = 0, n = buf.length;
							i < n && !isReduced(acc);
							i++
						) {
							acc = reduce(acc, buf[i]);
						}
					}
					buf.length = 0;
					acc = complete(acc);
					return acc;
				},
				(acc, x: T) => {
					buf.push(x);
					if (buf.length === n) {
						shuffle(buf, Math.min(maxSwaps, n), rnd);
						acc = reduce(acc, buf.shift()!);
					}
					return acc;
				},
			];
		})
	);
}
