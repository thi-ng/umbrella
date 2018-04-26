import { IObjectOf } from "@thi.ng/api/api";

import { indexed } from "./indexed";
import { intersection } from "./intersection";
import { invertObj } from "./invert";
import { mergeObj } from "./merge";
import { renameKeysObj } from "./rename-keys";
import { selectKeysObj } from "./select-keys";
import { empty, first, objValues } from "./utils";

/**
 * Computes the natural join between the two sets of relations. Each set
 * is assumed to have plain objects as values with at least one of the
 * keys present in both sides. Furthermore the objects in each set are
 * assumed to have the same internal structure (i.e. sets of keys).
 *
 * ```
 * join(
 *   new Set([
 *     {id: 1, name: "foo"},
 *     {id: 2, name: "bar"},
 *     {id: 3, name: "baz"}]),
 *   new Set([
 *     {id: 1, color: "red"},
 *     {id: 2, color: "blue"}])
 * )
 * // Set {
 * //   { id: 1, color: 'red', name: 'foo' },
 * //   { id: 2, color: 'blue', name: 'bar' }
 * // }
 * ```
 *
 * @param xrel
 * @param yrel
 */
export function join<A, B>(xrel: Set<A>, yrel: Set<B>) {
    if (xrel.size && yrel.size) {
        const ks = [...intersection(
            new Set(Object.keys(first(xrel) || {})),
            new Set(Object.keys(first(yrel) || {})))
        ];
        let r, s;
        if (xrel.size <= yrel.size) {
            r = xrel;
            s = yrel;
        } else {
            r = yrel;
            s = xrel;
        }
        const idx = indexed(r, ks);
        const res = empty(xrel, Set);
        for (let x of s) {
            const found = idx.get(selectKeysObj(x, ks));
            if (found) {
                for (let f of found) {
                    res.add(mergeObj({ ...f }, x));
                }
            }
        }
        return res;
    }
    return empty(xrel, Set);
}

/**
 * Similar to `join()`, computes the join between two sets of relations,
 * using the given keys in `kmap` only. `kmap` can also be used to
 * rename join keys in `yrel` where needed, e.g.
 *
 * ```
 * joinWith(
 *   new Set([
 *     {id: 1, name: "foo"},
 *     {id: 2, name: "bar"},
 *     {id: 3, name: "baz"}]),
 *   new Set([
 *     {type: 1, color: "red"},
 *     {type: 2, color: "blue"}]),
 *   {id: "type"}
 * )
 * ```
 * If no renaming is desired, the values in `kmap` should be the same as
 * their respective keys.
 *
 * @param xrel
 * @param yrel
 * @param kmap keys to compute join for
 */
export function joinWith<A, B>(xrel: Set<A>, yrel: Set<B>, kmap: IObjectOf<PropertyKey>) {
    if (xrel.size && yrel.size) {
        let r: Set<any>, s: Set<any>;
        let k: IObjectOf<PropertyKey>;
        if (xrel.size <= yrel.size) {
            r = xrel;
            s = yrel;
            k = invertObj(kmap);
        } else {
            r = yrel;
            s = xrel;
            k = kmap;
        }
        const idx = indexed(r, objValues(k));
        const ks = Object.keys(k);
        const res = empty(xrel, Set);
        for (let x of s) {
            const found = idx.get(renameKeysObj(selectKeysObj(x, ks), k));
            if (found) {
                for (let f of found) {
                    res.add(mergeObj({ ...f }, x));
                }
            }
        }
        return res;
    }
    return empty(xrel, Set);
}
