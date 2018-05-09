import { IObjectOf } from "@thi.ng/api/api";

/**
 * Like `commonKeysObj()`, but for ES6 Maps.
 *
 * @param a
 * @param b
 */
export function commonKeysMap<K>(a: Map<K, any>, b: Map<K, any>) {
    const res: K[] = [];
    for (let k of a.keys()) {
        if (b.has(k)) {
            res.push(k);
        }
    }
    return res;
}

/**
 * Returns array of keys present in both args, i.e. the set intersection
 * of the given objects' key / property sets.
 *
 * ```
 * commonKeys({ a: 1, b: 2 }, { c: 10, b: 20, a: 30 })
 * // [ "a", "b" ]
 * ```
 *
 * @param a
 * @param b
 */
export function commonKeysObj(a: IObjectOf<any>, b: IObjectOf<any>) {
    const res: string[] = [];
    for (let k in a) {
        if (b.hasOwnProperty(k)) {
            res.push(k);
        }
    }
    return res;
}
