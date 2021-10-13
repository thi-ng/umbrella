import type { Nullable } from "@thi.ng/api";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { ensureReduced, isReduced, unreduced } from "./reduced.js";

/**
 * Transducer to concatenate iterable values. Iterates over each input
 * and emits individual values down stream, therefore removing one level
 * of nesting from the input.
 *
 * @remarks
 * If, during processing, the transducer is given a wrapped reduced
 * input iterable, it will still be processed as normal, but then
 * immediately triggers early termination by wrapping its own result in
 * {@link reduced}. E.g. this behavior allows a {@link (mapcat:1)} user
 * functions to benefit from reduced results.
 *
 * Also see:
 * - {@link concat}
 * - {@link (mapcat:1)}
 *
 * @example
 * ```ts
 * [...iterator(comp(map((x) => [x, x]), cat()), [1, 2, 3, 4])]
 * // [ 1, 1, 2, 2, 3, 3, 4, 4 ]
 *
 * [...iterator(
 *   comp(
 *     mapIndexed((i, x) => [[i], [x, x]]),
 *     cat(),
 *     cat()
 *   ),
 *   "abc"
 * )]
 * // [ 0, 'a', 'a', 1, 'b', 'b', 2, 'c', 'c' ]
 *
 * [...mapcat((x)=>(x > 1 ? reduced([x, x]) : [x, x]), [1, 2, 3, 4])]
 * // [ 1, 1, 2, 2 ]
 * ```
 *
 * @param rfn -
 */
export const cat =
    <T>(): Transducer<Nullable<Iterable<T>>, T> =>
    (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn, (acc, x: Iterable<T> | null | undefined) => {
            if (x) {
                for (let y of unreduced(x)) {
                    acc = r(acc, y);
                    if (isReduced(acc)) {
                        break;
                    }
                }
            }
            return isReduced(x) ? ensureReduced(acc) : acc;
        });
    };
