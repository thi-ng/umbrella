import type { Fn2 } from "@thi.ng/api";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { __iter } from "./iterator.js";

/**
 * Transducer. Similar to {@link (map:1)}, but given `fn` takes two
 * arguments: `index` and `value` to transform.
 *
 * @remarks
 * An optional start index `offset` can be provided (default 0).
 *
 * @example
 * ```ts
 * transduce(
 *   mapIndexed((i, x) => ["id" + i, x * 10], 42),
 *   assocObj(),
 *   [1, 2, 3]
 * )
 * // { id42: 10, id43: 20, id44: 30 }
 * ```
 *
 * @param fn - transformation function
 * @param offset - initial index
 */
export function mapIndexed<A, B>(
    fn: Fn2<number, A, B>,
    offset?: number
): Transducer<A, B>;
export function mapIndexed<A, B>(
    fn: Fn2<number, A, B>,
    src: Iterable<A>
): IterableIterator<B>;
export function mapIndexed<A, B>(
    fn: Fn2<number, A, B>,
    offset: number,
    src: Iterable<A>
): IterableIterator<B>;
export function mapIndexed<A, B>(...args: any[]): any {
    return (
        __iter(mapIndexed, args) ||
        ((rfn: Reducer<any, B>) => {
            const r = rfn[2];
            const fn: Fn2<number, A, B> = args[0];
            let i: number = args[1] || 0;
            return compR(rfn, (acc, x: A) => r(acc, fn(i++, x)));
        })
    );
}
