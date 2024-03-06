import type { Keys } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { empty } from "./empty.js";
import { selectKeysObj } from "./select-keys.js";
import { withoutKeysObj } from "./without-keys.js";

/**
 * Same as {@link partitionKeysObj}, but for maps.
 *
 * @param src
 * @param ks
 */
export const partitionKeysMap = <K, V>(
	src: Map<K, V>,
	ks: Iterable<K>
): [Map<K, V>, Map<K, V>] => {
	const destA = empty(src, Map);
	const destB = empty(src, Map);
	for (let k of ks) {
		(src.has(k) ? destA : destB).set(k, src.get(k));
	}
	return [destA, destB];
};

/**
 * Takes an object and a number of its property keys, returns a 2-tuple of
 * segmented versions of the original object: `[obj-with-only-selected-keys,
 * obj-without-selected-keys]`.
 *
 * @remarks
 * The segmented versions are produced by {@link selectKeysObj} and
 * {@link withoutKeysObj} respectively.
 *
 * @example
 * ```ts tangle:../export/partition-keys.ts
 * import { partitionKeysObj } from "@thi.ng/associative";
 *
 * console.log(
 *   partitionKeysObj({ a: 1, b: 2, c: 3, d: 4 }, ["a", "c", "e"])
 * );
 * // [
 * //  { a: 1, c: 3 },
 * //  { b: 2, d: 4 }
 * // ]
 * ```
 *
 * @param obj
 * @param keys
 */
export const partitionKeysObj = <T extends object>(
	obj: T,
	keys: Iterable<Keys<T>>
): [Partial<T>, Partial<T>] => {
	const $keys = ensureArray(keys);
	return [selectKeysObj(obj, $keys), withoutKeysObj(obj, $keys)];
};
