import { empty } from "./empty.js";
import { EquivMap } from "./equiv-map.js";
import { selectKeysObj } from "./select-keys.js";

/**
 * Takes an iterable of plain objects and array of indexing keys. Calls
 * {@link selectKeysObj} on each value and uses returned objects as new keys
 * to group original values. Returns a new {@link EquivMap} of sets.
 *
 * @example
 * ```ts
 * import { indexed } from "@thi.ng/associative";
 *
 * indexed(
 *   new Set([{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 1, c: 2}]),
 *   ["a","b"]
 * )
 * // EquivMap {
 * //   { a: 1, b: 1 } => Set { { a: 1, b: 1 }, { a: 1, b: 1, c: 2 } },
 * //   { a: 1, b: 2 } => Set { { a: 1, b: 2 } } }
 * ```
 *
 * @param records - objects to index
 * @param ks - keys used for indexing
 */
export const indexed = <T extends object>(
	records: Iterable<T>,
	ks: (keyof T)[]
) => {
	const res = new EquivMap<{ [id in keyof T]?: T[id] }, Set<T>>();
	let x, ik, rv;
	for (x of records) {
		ik = selectKeysObj(x, ks);
		rv = res.get(ik);
		!rv && res.set(ik, (rv = empty(records, Set)));
		rv.add(x);
	}
	return res;
};
