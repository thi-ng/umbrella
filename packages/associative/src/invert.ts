import { IObjectOf } from "@thi.ng/api/api";

import { empty } from "./utils";

/**
 * Returns a new map in which the original values are used as keys and
 * original keys as values.
 *
 * ```
 * invertMap(new Map([["a", 1], ["b", 2]]));
 * // Map { 1 => 'a', 2 => 'b' }
 * ```
 *
 * @param src
 */
export function invertMap<K, V>(src: Map<K, V>) {
    const dest: Map<V, K> = empty(src, Map);
    for (let p of src) {
        dest.set(p[1], p[0]);
    }
    return dest;
}

/**
 * Returns a new object in which the original values are used as keys
 * and original keys as values.
 *
 * ```
 * invertObj({a: 1, b: 2})
 * // { '1': 'a', '2': 'b' }
 * ```
 *
 * @param src
 */
export function invertObj(src: IObjectOf<PropertyKey>) {
    const dest: IObjectOf<PropertyKey> = {};
    for (let k in src) {
        dest[<any>src[k]] = k;
    }
    return dest;
}
