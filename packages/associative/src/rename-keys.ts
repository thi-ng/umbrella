import { IObjectOf } from "@thi.ng/api/api";

import { empty } from "./utils";

/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * @param src
 * @param km
 */
export function renameKeysMap<K, V>(src: Map<K, V>, km: Map<K, K>) {
    const dest: Map<K, V> = empty(src, Map);
    for (let [k, v] of src) {
        dest.set(km.has(k) ? km.get(k) : k, v);
    }
    return dest;
}

/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * ```
 * // swap a & b, rename c
 * renameKeysObj({a: 1, b: 2, c: 3}, {a: "b", b: "a", c: "cc"})
 * // {b: 1, a: 2, cc: 3}
 * ```
 *
 * @param src
 * @param km
 */
export function renameKeysObj<T>(src: IObjectOf<T>, km: IObjectOf<PropertyKey>) {
    const dest = {};
    for (let k in src) {
        dest[km.hasOwnProperty(k) ? km[k] : k] = src[k];
    }
    return dest;
}
