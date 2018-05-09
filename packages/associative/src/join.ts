import { IObjectOf } from "@thi.ng/api/api";

import { commonKeysObj } from "./common-keys";
import { indexed } from "./indexed";
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
 * Returns new set of same type as `xrel`.
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
export function join(xrel: Set<IObjectOf<any>>, yrel: Set<IObjectOf<any>>): Set<IObjectOf<any>> {
    if (xrel.size && yrel.size) {
        const ks = commonKeysObj(first(xrel) || {}, first(yrel) || {});
        let a: Set<any>, b: Set<any>;
        if (xrel.size <= yrel.size) {
            a = xrel;
            b = yrel;
        } else {
            a = yrel;
            b = xrel;
        }
        const idx = indexed(a, ks);
        const res: Set<any> = empty(xrel, Set);
        for (let x of b) {
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
 * using the given keys in `kmap` only for joining and ignoring others.
 * `kmap` can also be used to translate join keys in `yrel` where
 * needed. Else, if no renaming is desired, the values in `kmap` should
 * be the same as their respective keys, e.g. `{id: "id"}`. Returns new
 * set of same type as `xrel`.
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
 * // Set {
 * //   { type: 1, color: 'red', id: 1, name: 'foo' },
 * //   { type: 2, color: 'blue', id: 2, name: 'bar' } }
 * ```
 *
 * @param xrel
 * @param yrel
 * @param kmap keys to compute join for
 */
export function joinWith(xrel: Set<any>, yrel: Set<any>, kmap: IObjectOf<PropertyKey>): Set<any> {
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
        const res: Set<any> = empty(xrel, Set);
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
