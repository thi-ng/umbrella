import { Fn2, IObjectOf } from "@thi.ng/api";
import { copy } from "./utils";

export const mergeMapWith = <K, V>(
    f: Fn2<V, V, V>,
    dest: Map<K, V>,
    ...xs: Map<K, V>[]
) => {
    const res: Map<K, V> = copy(dest, Map);
    for (let x of xs) {
        for (let [k, v] of x) {
            res.set(k, res.has(k) ? f(res.get(k)!, v) : v);
        }
    }
    return res;
};

export const mergeObjWith = <T>(
    f: Fn2<T, T, T>,
    dest: IObjectOf<T>,
    ...xs: IObjectOf<T>[]
) => {
    const res: IObjectOf<T> = { ...dest };
    for (let x of xs) {
        for (let k in x) {
            const v = x[k];
            res[k] = res.hasOwnProperty(k) ? f(dest[k], v) : v;
        }
    }
    return res;
};
