import { empty } from "./empty.js";

/**
 * Returns a new map of same type as input only containing given keys
 * (and only if they existed in the original map).
 *
 * @param src - source map
 * @param ks - selected keys
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
 * Similar to {@link selectKeysMap}, but only selects keys if their value is
 * defined (i.e. non-nullish).
 *
 * @param src
 * @param ks
 */
export const selectDefinedKeysMap = <K, V>(
    src: Map<K, V>,
    ks: Iterable<K>
): Map<K, V> => {
    const dest = empty(src, Map);
    for (let k of ks) {
        const val = src.get(k);
        if (val != null) dest.set(k, val);
    }
    return dest;
};

/**
 * Returns a new object only containing given keys (and only if they
 * existed in the original).
 *
 * @param src - source object
 * @param ks - selected keys
 */
export const selectKeysObj = <T extends object, K extends keyof T>(
    src: T,
    ks: Iterable<K>
): Partial<T> => {
    const dest: any = {};
    for (let k of ks) {
        src.hasOwnProperty(k) && (dest[k] = (<any>src)[<any>k]);
    }
    return dest;
};

/**
 * Similar to {@link selectKeysObj}, but only selects keys if their value is
 * defined (i.e. non-nullish).
 *
 * @param src
 * @param ks
 */
export const selectDefinedKeysObj = <T extends object, K extends keyof T>(
    src: T,
    ks: Iterable<K>
) => {
    const res: Partial<T> = {};
    for (let k of ks) {
        const val = src[k];
        if (val != null) res[k] = val;
    }
    return res;
};
