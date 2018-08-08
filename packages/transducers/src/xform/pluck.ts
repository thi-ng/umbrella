import { Transducer } from "../api";
import { iterator } from "../iterator";
import { map } from "./map";

/**
 * Transducer which looks up given `key` in each input and yields
 * sequence of these values.
 *
 * ```
 * [...iterator(pluck("id"), [{id: 1}, {id: 2}, {}])]
 * // [ 1, 2, undefined ]
 * ```
 *
 * @param key property key
 */
export function pluck<A, B>(key: PropertyKey): Transducer<A, B>;
export function pluck<A, B>(key: PropertyKey, src: Iterable<A>): IterableIterator<B>;
export function pluck<A>(key: PropertyKey, src?: Iterable<A>): any {
    return src ?
        iterator(pluck(key), src) :
        map((x: A) => x[key]);
}
