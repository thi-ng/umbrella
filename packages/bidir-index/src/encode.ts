import type { BidirIndex } from "./bidir-index.js";

/**
 * Encodes given object into an array, using the given `index` to determine each
 * key's value position. The array will be pre-filled with `defaultValue`.
 * Unless `indexKeys` is disabled, the object's keys are first added to the
 * index.
 *
 * @remarks
 * Also see {@link decodeObject} for reverse operation.
 *
 * @example
 * ```ts tangle:../export/encode-object.ts
 * import { defBidirIndex, encodeObject } from "@thi.ng/bidir-index";
 *
 * const index = defBidirIndex<string>();
 *
 * console.log(
 *   encodeObject(index, { r: 255, g: 128, b: 64, a: 1 }, 0)
 * );
 * // [255, 128, 64, 1]
 *
 * // encode without updating index
 * console.log(
 *   encodeObject(index, { b: 3, r: 1, g: 2 }, 0, false)
 * );
 * // [1, 2, 3, 0] (key `a` uses default)
 * ```
 *
 * @param index
 * @param obj
 * @param defaultValue
 * @param indexKeys
 */
export const encodeObject = <V, K extends string = string>(
	index: BidirIndex<K>,
	obj: Partial<Record<K, V>>,
	defaultValue: V,
	indexKeys = true
) => {
	const keys = <K[]>Object.keys(obj);
	const ids = indexKeys ? index.addAll(keys) : index.getAll(keys);
	const res = new Array<V>(index.size).fill(defaultValue);
	for (let i = keys.length; i-- > 0; ) {
		const val = obj[keys[i]];
		if (val != null) res[ids[i]] = val;
	}
	return res;
};

/**
 * Reverse op of {@link encodeObject}. Takes an array of `values` and returns an
 * object with values mapped to keys based on their indexed position. If the
 * `values` array has a nullish value for a keyed index, the optionally provided
 * `defaults` object will be used to obtain a value. The result object will only
 * have keys with non-nullish values.
 *
 * @remarks
 * Note: Irrespective of original key type used for this index instance, the
 * keys in the result object will be strings.
 *
 * Also see {@link encodeObject}.
 *
 * @example
 * ```ts tangle:../export/decode-object.ts
 * import { defBidirIndex, decodeObject } from "@thi.ng/bidir-index";
 *
 * const index = defBidirIndex<string>();
 * index.addAll(["r", "g", "b", "a", "foo"]);
 *
 * // decode with defaults/fallback
 * console.log(
 *   decodeObject(index, [255, 128, 64], { a: 1 })
 * );
 * // { r: 255, g: 128, b: 64, a: 1 } (key `foo` is omitted in result)
 *
 * console.log(
 *   decodeObject(index, [null, null, null, null, "bar"])
 * );
 * // { foo: "bar" }
 * ```
 *
 * @param values
 * @param defaults
 */
export const decodeObject = <V, K extends string = string>(
	index: Iterable<[K, number]>,
	values: V[],
	defaults?: Partial<Record<K, V>>
) => {
	const res: Partial<Record<K, V>> = {};
	for (let [k, id] of index) {
		const val = values[id] ?? defaults?.[k];
		if (val != null) res[k] = val;
	}
	return res;
};
