import type { Fn2, Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { empty } from "./utils";

/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * @param src - source map
 * @param km - key mappings
 * @param out - result map
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
 * @param src - source object
 * @param km - key mappings
 * @param out - result object
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

/**
 * Similar to (combination of) {@link renameKeysObj} and
 * {@link selectDefinedKeysObj}. Takes a `src` object and `keys`, an object of
 * mappings to rename given keys and (optionally) transform their values.
 * Returns new object. If `src` is nullish itself, returns an empty object.
 *
 * @remarks
 * Only keys with non-nullish values (in `src`) are being processed. The `keys`
 * object uses the original key names as keys and the new keys as their values
 * (like {@link renameKeysObj}). If a transformation of a key's value is
 * desired, the format is `{ oldname: [newname, xform] }`, where `xform` is a
 * 2-arg function, receiving the original value of `oldname` and the entire
 * `src` object as 2nd arg. The return value of that function will be used as
 * the value of `newname`.
 *
 * @example
 * ```ts
 * renameTransformedKeys(
 *   // source object
 *   { a: 1, b: 2, c: null },
 *   // mappings
 *   {
 *     // rename a => aa
 *     a: "aa",
 *     // rename & transform
 *     b: ["bb", (x, src) => x * 10 + src.a]
 *     // ignored, since original c is null
 *     c: "cc"
 *   }
 * )
 * // { aa: 1, bb: 21 }
 * ```
 *
 * @param src
 * @param keys
 */
export const renameTransformedKeys = <T extends object, K extends keyof T>(
    src: Nullable<T>,
    keys: Record<K, PropertyKey | [PropertyKey, Fn2<any, T, any>]>
) => {
    if (!src) return {};
    const res: any = {};
    for (let $k in keys) {
        const spec = keys[$k];
        const [k, fn] = isArray(spec) ? spec : [spec];
        const val = src[$k];
        if (val != null) res[k] = fn ? fn(val, src) : val;
    }
    return res;
};
