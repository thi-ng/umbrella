// SPDX-License-Identifier: Apache-2.0
import type { Fn2 } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "./api.js";
import { comp } from "./comp.js";
import { iterator } from "./iterator.js";
import { map } from "./map.js";
import { mapcat } from "./mapcat.js";
import { normRange } from "./norm-range.js";
import { partition } from "./partition.js";

/**
 * Higher order interpolation transducer. The resulting transducer forms a
 * sliding window of input values and calls `fn` (the given interpolation
 * function) `n` times for the current window and a normalized time value to
 * produce the requested number of interpolated values per interval. Yields a
 * sequence of interpolated values.
 *
 * @remarks
 * If the optional `src` iterable is given, `interpolate` returns an iterator of
 * interpolated values. No values will be produced if the number of inputs is
 * less than given `window` size.
 *
 * Note: The *very last* input value can never be fully reached and might need
 * to be explicitly duplicated in the input, e.g. via the {@link extendSides}
 * iterator...
 *
 * See also:
 *
 * - {@link interpolateHermite}
 * - {@link interpolateLinear}
 * - {@link extendSides}
 *
 * @example
 * ```ts tangle:../export/interpolate.ts
 * import { interpolate } from "@thi.ng/transducers";
 *
 * const res = [...interpolate(
 *   // interpolation function
 *   ([a, b], t) => a + (b - a) * t,
 *   // window size
 *   2,
 *   // num samples per window
 *   8,
 *   // input values
 *   [0, 1, 0, 2]
 * )];
 *
 * console.log(res);
 * // [ 0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875,
 * //  1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125,
 * //  0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75 ]
 * ```
 *
 * @param fn -
 * @param window -
 * @param n -
 */
export function interpolate<T>(
	fn: Fn2<T[], number, T>,
	window: number,
	n: number
): Transducer<number, number>;
export function interpolate<T>(
	fn: Fn2<T[], number, T>,
	window: number,
	n: number,
	src: Iterable<number>
): IterableIterator<number>;
export function interpolate<T>(
	fn: Fn2<T[], number, T>,
	window: number,
	n: number,
	src?: Iterable<number>
) {
	return isIterable(src)
		? iterator(interpolate(fn, window, n), src)
		: comp(
				partition<T>(window, 1),
				mapcat((chunk) => map((t) => fn(chunk, t), normRange(n, false)))
		  );
}
