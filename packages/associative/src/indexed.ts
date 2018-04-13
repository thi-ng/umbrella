import { EquivMap } from "./equiv-map";
import { selectKeysObj } from "./select-keys";
import { empty } from "./utils";

/**
 * Takes a set of objects and array of indexing keys. Calls
 * `selectKeysObj` on each set value and used returned objects as new
 * keys to group original values. Returns a map of sets.
 *
 * ```
 * indexed(
 *   new Set([{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 1, c: 2}]),
 *   ["a","b"]
 * )
 * // EquivMap {
 * //   { a: 1, b: 1 } => Set { { a: 1, b: 1 }, { a: 1, b: 1, c: 2 } },
 * //   { a: 1, b: 2 } => Set { { a: 1, b: 2 } } }
 * ```
 *
 * @param records set of objects to index
 * @param ks keys used for indexing
 */
export function indexed<T>(records: Set<T>, ks: PropertyKey[]) {
    const res = new EquivMap<any, Set<T>>();
    let m, ik, rv;
    for (m of records) {
        ik = selectKeysObj(m, ks);
        rv = res.get(ik);
        if (!rv) {
            res.set(ik, rv = empty(records, Set));
        }
        rv.add(m);
    }
    return res;
}
