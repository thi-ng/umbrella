import type { Fn2 } from "@thi.ng/api";
import type { Transducer } from "./api.js";
import { cat } from "./cat.js";
import { comp } from "./comp.js";
import { __iter, iterator } from "./iterator.js";
import { mapIndexed } from "./map-indexed.js";

/**
 * Transducer. Similar to {@link (mapcat:1)}, but given `fn` takes two
 * arguments: `index` and `value` to transform.
 *
 * @remarks
 * An optional start index `offset` can be provided (default 0). Also see
 * {@link (mapIndexed:1)}.
 *
 * @param fn - transformation function
 * @param offset - initial index
 */
export function mapcatIndexed<A, B>(
    fn: Fn2<number, A, Iterable<B> | null | undefined>,
    offset?: number
): Transducer<A, B>;
export function mapcatIndexed<A, B>(
    fn: Fn2<number, A, Iterable<B> | null | undefined>,
    src: Iterable<A>
): IterableIterator<B>;
export function mapcatIndexed<A, B>(
    fn: Fn2<number, A, Iterable<B> | null | undefined>,
    offset: number,
    src: Iterable<A>
): IterableIterator<B>;
export function mapcatIndexed<A, B>(...args: any[]): any {
    return (
        __iter(mapcatIndexed, args, iterator) ||
        comp(mapIndexed<A, Iterable<B>>(args[0], args[1]), cat())
    );
}
