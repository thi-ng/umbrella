import type { Fn } from "@thi.ng/api";
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
 * ```ts
 * // single result (unwrapped, default)
 * step(map(x => x * 10))(1);
 * // 10
 *
 * // single result (no unwrapping)
 * step(map(x => x * 10), false)(1);
 * // [10]
 *
 * // multiple results
 * step(mapcat(x => [x, x + 1, x + 2]))(1)
 * // [ 1, 2, 3 ]
 *
 * // multiple results (default behavior)
 * step(mapcat(x => x))([1, 2])
 * // [1, 2]
 * step(mapcat(x => x))([3])
 * // 3
 * // ...once more without unwrapping
 * step(mapcat(x => x), false)([3])
 * // [3]
 *
 * // no result
 * f = step(filter((x) => !(x & 1)))
 * f(1); // undefined
 * f(2); // 2
 *
 * // reduced value termination
 * f = step(take(2));
 * f(1); // 1
 * f(1); // 1
 * f(1); // undefined
 * f(1); // undefined
 * ```
 *
 * @param tx -
 * @param unwrap -
 */
export const step = <A, B>(tx: TxLike<A, B>, unwrap = true): Fn<A, B | B[]> => {
	const { 1: complete, 2: reduce } = ensureTransducer(tx)(push());
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
