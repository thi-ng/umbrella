import { IObjectOf } from "@thi.ng/api/api";

import { empty } from "./utils";

/**
 * Returns a new map of same type as input only containing given keys
 * (and only if they existed in the original map).
 *
 * @param src
 * @param ks selected keys
 */
export function selectKeysMap<K, V>(src: Map<K, V>, ks: Iterable<K>): any {
    const dest = empty(src, Map);
    for (let k of ks) {
        if (src.has(k)) {
            dest.set(k, src.get(k));
        }
    }
    return dest;
}

/**
 * Returns a new object only containing given keys (and only if they
 * existed in the original).
 *
 * @param src
 * @param ks
 */
export function selectKeysObj<T>(src: IObjectOf<T>, ks: Iterable<PropertyKey>): any {
    const dest: IObjectOf<T> = {};
    for (let k of ks) {
        if (src.hasOwnProperty(k)) {
            dest[<any>k] = src[<any>k];
        }
    }
    return dest;
}
