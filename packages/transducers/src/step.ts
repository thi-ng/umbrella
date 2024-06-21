import type { Fn, Maybe } from "@thi.ng/api";
import type { TxLike } from "./api.js";
import { ensureTransducer } from "./ensure.js";
import { push } from "./push.js";
import { isReduced } from "./reduced.js";

/**
 * Single-step transducer execution wrapper. Returns array if the given
 * transducer produces multiple results and undefined if there was no output. If
 * the transducer only produces a single result (per step) and if `unwrap`
 * is true (default), the function returns that single result value itself.
 *
 * @remarks
 * Likewise, once a transducer has produced a final / reduced value, all further
 * invocations of the stepper function will return undefined.
 *
 * @example
 * ```ts tangle:../export/step.ts
 * import { filter, map, mapcat, step, take } from "@thi.ng/transducers";
 *
 * // single result (unwrapped, default)
 * console.log(
 *   step(map((x: number) => x * 10))(1)
 * );
 * // 10
 *
 * // single result (no unwrapping)
 * console.log(
 *   step(map((x: number) => x * 10), false)(1)
 * );
 * // [10]
 *
 * // multiple results
 * console.log(
 *   step(mapcat((x: number) => [x, x + 1, x + 2]))(1)
 * );
 * // [ 1, 2, 3 ]
 *
 * // multiple results (default behavior)
 * console.log(
 *   step(mapcat((x: number[]) => take(2, x)))([1, 2, 3, 4])
 * );
 * // [1, 2]
 *
 * console.log(
 *   step(mapcat((x: number[]) => x))([3])
 * );
 * // 3
 *
 * // ...once more without unwrapping
 * console.log(
 *   step(mapcat((x: number[]) => x), false)([3])
 * );
 * // [3]
 *
 * // filter even values
 * const f = step(filter((x: number) => !(x & 1)))
 *
 * console.log(f(1)); // undefined
 * console.log(f(2)); // 2
 *
 * // reduced value termination
 * const g = step(take(2));
 * console.log(g(1)); // 1
 * console.log(g(1)); // 1
 * console.log(g(1)); // undefined
 * console.log(g(1)); // undefined
 * ```
 *
 * @param tx -
 * @param unwrap -
 */
export const step = <A, B>(
	tx: TxLike<A, B>,
	unwrap = true
): Fn<A, Maybe<B | B[]>> => {
	const [_, complete, reduce] = ensureTransducer(tx)(push());
	let done = false;
	return (x: A) => {
		if (!done) {
			let acc = reduce([], x);
			done = isReduced(acc);
			if (done) {
				acc = complete(acc.deref());
			}
			return acc.length === 1 && unwrap
				? acc[0]
				: acc.length > 0
				? acc
				: undefined;
		}
	};
};
