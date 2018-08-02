import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

/**
 * Transducer. Similar to `map`, but given `fn` takes two arguments:
 * `index` and `value` to transform. An optional start index `offset`
 * can be provided (default 0).
 *
 * ```
 * transduce(
 *   mapIndexed((i, x) => ["id" + i, x * 10], 42),
 *   assocObj(),
 *   [1, 2, 3]
 * )
 * // { id42: 10, id43: 20, id44: 30 }
 * ```
 *
 * @param fn transformation function
 * @param offset initial index
 */
export function mapIndexed<A, B>(fn: (i: number, x: A) => B, offset = 0): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        const r = rfn[2];
        let i = offset;
        return compR(rfn,
            (acc, x: A) => r(acc, fn(i++, x)));
    };
}
