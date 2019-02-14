import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";

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
export function mapIndexed<A, B>(fn: (i: number, x: A) => B, offset?: number): Transducer<A, B>;
export function mapIndexed<A, B>(fn: (i: number, x: A) => B, src: Iterable<A>): IterableIterator<B>;
export function mapIndexed<A, B>(fn: (i: number, x: A) => B, offset: number, src: Iterable<A>): IterableIterator<B>;
export function mapIndexed<A, B>(...args: any[]): any {
    return $iter(mapIndexed, args) ||
        ((rfn: Reducer<any, B>) => {
            const r = rfn[2];
            const fn: (i: number, x: A) => B = args[0];
            let i: number = args[1] || 0;
            return compR(rfn,
                (acc, x: A) => r(acc, fn(i++, x)));
        });
}
