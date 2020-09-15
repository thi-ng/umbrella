import type { Fn } from "@thi.ng/api";
import type { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";

/**
 * Transducer. Similar to {@link (map:1)}, but only transforms every
 * `n`-th input value and passes intermediate values unchanged
 * downstream.
 *
 * @remarks
 * The optional `offset` arg can be used to adjust the
 * number of inputs before the first transformation occurs (default 0).
 *
 * @example
 * ```ts
 * [...mapNth(3, (x) => x * 10, range(1,10))]
 * // [ 10, 2, 3, 40, 5, 6, 70, 8, 9 ]
 *
 * // with offset
 * [...mapNth(3, 5, (x) => x * 10, range(1,10))]
 * // [ 1, 2, 3, 4, 5, 60, 7, 8, 90 ]
 * ```
 *
 * @param n - step size
 * @param fn - transformation function
 */
export function mapNth<A, B>(n: number, fn: Fn<A, B>): Transducer<A, A | B>;
export function mapNth<A, B>(
    n: number,
    offset: number,
    fn: Fn<A, B>
): Transducer<A, A | B>;
export function mapNth<A, B>(
    n: number,
    fn: Fn<A, B>,
    src: Iterable<A>
): IterableIterator<A | B>;
export function mapNth<A, B>(
    n: number,
    offset: number,
    fn: Fn<A, B>,
    src: Iterable<A>
): IterableIterator<A | B>;
export function mapNth<A, B>(...args: any[]): any {
    const iter = $iter(mapNth, args);
    if (iter) {
        return iter;
    }
    let n = args[0] - 1;
    let offset: number;
    let fn: Fn<A, B>;
    if (typeof args[1] === "number") {
        offset = args[1];
        fn = args[2];
    } else {
        fn = args[1];
        offset = 0;
    }
    return (rfn: Reducer<any, A | B>) => {
        const r = rfn[2];
        let skip = 0,
            off = offset;
        return compR(rfn, (acc, x: A) => {
            if (off === 0) {
                if (skip === 0) {
                    skip = n;
                    return r(acc, fn(x));
                }
                skip--;
            } else {
                off--;
            }
            return r(acc, x);
        });
    };
}
