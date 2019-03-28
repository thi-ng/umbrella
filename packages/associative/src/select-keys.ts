import { empty } from "./utils";

/**
 * Returns a new map of same type as input only containing given keys
 * (and only if they existed in the original map).
 *
 * @param src
 * @param ks selected keys
 */
export const selectKeysMap = <K, V>(
    src: Map<K, V>,
    ks: Iterable<K>
): Map<K, V> => {
    const dest = empty(src, Map);
    for (let k of ks) {
        src.has(k) && dest.set(k, src.get(k));
    }
    return dest;
};

/**
 * Returns a new object only containing given keys (and only if they
 * existed in the original).
 *
 * @param src
 * @param ks
 */
export const selectKeysObj = <T>(
    src: T,
    ks: Iterable<PropertyKey>
): { [id in keyof T]?: T[id] } => {
    const dest: any = {};
    for (let k of ks) {
        src.hasOwnProperty(k) && (dest[k] = src[<any>k]);
    }
    return dest;
};
