import { Predicate2, SEMAPHORE } from "@thi.ng/api";
import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";
import { ensureReduced } from "../reduced";

/**
 * Transducer which for each input `x` (apart from the very first one)
 * applies given predicate `pred` to previous input and `x` and only
 * passed values downstream as long as the predicate returns falsy
 * result. Once the result is truthy, transformation is terminated (by
 * emitting a `reduced()` value).
 *
 * This can be used to limit processing of inputs only as long as
 * there're noticeable changes (according to the predicate) and then
 * stop the transducer pipeline once results have converged.
 *
 * ```
 * // only take new values as long as difference to prev value is >= 0.1
 * [...converge(
 *       // predicate
 *       (a, b) => Math.abs(a - b) < 0.1,
 *       // input sequence
 *       iterate((x, i) => x + 1 / i, 0)
 * )]
 *
 * // [ 0,
 * //   1,
 * //   1.5,
 * //   1.8333333333333333,
 * //   2.083333333333333,
 * //   2.283333333333333,
 * //   2.4499999999999997,
 * //   2.5928571428571425,
 * //   2.7178571428571425,
 * //   2.8289682539682537,
 * //   2.9289682539682538 ]
 * ```
 *
 * @see takeWhile
 *
 * @param pred
 * @param src
 */
export function converge<T>(pred?: Predicate2<T>): Transducer<T, T>;
export function converge<T>(src: Iterable<T>): IterableIterator<T>;
export function converge<T>(pred: Predicate2<T>, src: Iterable<T>): IterableIterator<T>;
export function converge<T>(...args: any[]): any {
    return $iter(converge, args) ||
        ((rfn: Reducer<any, T>) => {
            const r = rfn[2];
            const pred = args[0];
            let prev: any = SEMAPHORE;
            let done = false;
            return compR(rfn,
                (acc, x: T) => {
                    if (done || (prev !== SEMAPHORE && pred(prev, x))) {
                        done = true;
                        return ensureReduced(acc);
                    }
                    prev = x;
                    return r(acc, x);
                }
            );
        });
}
