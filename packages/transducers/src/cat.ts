import type { Nullable } from "@thi.ng/api";
import type { MaybeReduced, Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { ensureReduced, isReduced, unreduced } from "./reduced.js";

/**
 * Transducer to concatenate iterable values. Iterates over each input and emits
 * individual values down stream, therefore removing one level of nesting from
 * the input.
 *
 * @remarks
 * If, during processing, the transducer is given a wrapped reduced input
 * iterable, it will still be processed as normal, but then immediately triggers
 * early termination by wrapping its own result in {@link reduced}. E.g. this
 * behavior allows a {@link mapcat} user functions to benefit from reduced
 * results.
 *
 * Also see {@link concat}, {@link mapcat}.
 *
 * @example
 * ```ts tangle:../export/cat.ts
 * import {
 *   cat, comp, iterator, map, mapcat, mapIndexed, reduced
 * } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...iterator(comp(map((x) => [x, x]), cat()), [1, 2, 3, 4])]
 * );
 * // [ 1, 1, 2, 2, 3, 3, 4, 4 ]
 *
 * console.log(
 *   [...iterator(
 *     comp(
 *       mapIndexed((i, x) => [[i], [x, x]]),
 *       cat<(number | string)[]>(),
 *       cat()
 *     ),
 *     "abc"
 *   )]
 * );
 * // [ 0, 'a', 'a', 1, 'b', 'b', 2, 'c', 'c' ]
 *
 * console.log(
 *   [...mapcat((x)=>(x > 1 ? reduced([x, x]) : [x, x]), [1, 2, 3, 4])]
 * );
 * // [ 1, 1, 2, 2 ]
 * ```
 *
 * @param rfn -
 */
export const cat =
	<T>(): Transducer<MaybeReduced<Nullable<Iterable<T>>>, T> =>
	(rfn: Reducer<T, any>) => {
		const r = rfn[2];
		return compR(rfn, (acc, x) => {
			if (x) {
				for (let y of unreduced(x) || []) {
					acc = r(acc, y);
					if (isReduced(acc)) {
						break;
					}
				}
			}
			return isReduced(x) ? ensureReduced(acc) : acc;
		});
	};
