import { empty } from "./utils";

/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * @param src -
 * @param km -
 * @param out -
 */
export const renameKeysMap = <K, V>(
    src: Map<K, V>,
    km: Map<K, K>,
    out?: Map<K, V>
) => {
    out = out || empty(src, Map);
    for (let [k, v] of src) {
        out!.set(km.has(k) ? km.get(k)! : k, v);
    }
    return out;
};

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
 * @param src -
 * @param km -
 */
export const renameKeysObj = <T>(
    src: T,
    km: { [id in keyof T]?: PropertyKey },
    out: any = {}
) => {
    for (let k in src) {
        out[km.hasOwnProperty(k) ? km[k] : k] = src[k];
    }
    return out;
};
