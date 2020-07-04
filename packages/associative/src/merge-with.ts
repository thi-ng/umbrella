import { copy } from "./utils";
import type { Fn2, IObjectOf, Nullable } from "@thi.ng/api";

export const mergeMapWith = <K, V>(
    f: Fn2<V, V, V>,
    dest: Map<K, V>,
    ...xs: Nullable<Map<K, V>>[]
) => {
    const res: Map<K, V> = copy(dest, Map);
    for (let x of xs) {
        if (x != null) {
            for (let [k, v] of x) {
                res.set(k, res.has(k) ? f(res.get(k)!, v) : v);
            }
        }
    }
    return res;
};

/**
 * Immutably merges given objects in a pairwise manner. Applies function
 * `f` if the same key exists in both objects and uses that function's
 * return value as new value for that key.
 *
 * @param f
 * @param dest
 * @param xs
 */
export const mergeObjWith = <T>(
    f: Fn2<T, T, T>,
    dest: IObjectOf<T>,
    ...xs: Nullable<IObjectOf<T>>[]
) => meldObjWith(f, { ...dest }, ...xs);

/**
 * Mutable version of {@link mergeObjWith}. Returns modified `dest`
 * object.
 *
 * @param f -
 * @param dest -
 * @param xs -
 */
export const meldObjWith = <T>(
    f: Fn2<T, T, T>,
    dest: IObjectOf<T>,
    ...xs: Nullable<IObjectOf<T>>[]
) => {
    for (let x of xs) {
        if (x != null) {
            for (let k in x) {
                const v = x[k];
                dest[k] = dest.hasOwnProperty(k) ? f(dest[k], v) : v;
            }
        }
    }
    return dest;
};
