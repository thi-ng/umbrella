import { EquivMap } from "./equiv-map";
import { selectKeysObj } from "./select-keys";
import { empty } from "./utils";

/**
 * Takes an iterable of plain objects and array of indexing keys. Calls
 * `selectKeysObj` on each value and uses returned objects as new keys
 * to group original values. Returns a new `EquivMap` of sets.
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
 * @param records objects to index
 * @param ks keys used for indexing
 */
export function indexed<T>(records: Iterable<T>, ks: PropertyKey[]) {
    const res = new EquivMap<any, Set<T>>();
    let x, ik, rv;
    for (x of records) {
        ik = selectKeysObj(x, ks);
        rv = res.get(ik);
        !rv && res.set(ik, rv = empty(records, Set));
        rv.add(x);
    }
    return res;
}
