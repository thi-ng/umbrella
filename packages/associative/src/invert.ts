import type { IObjectOf } from "@thi.ng/api";

/**
 * Returns a new map in which the original values are used as keys and
 * original keys as values. If `dest` is given, writes results in that
 * map instead. Depending on the value type of `src` and/or if the
 * inverted map should use custom key equality semantics as provided by
 * the Map types in this package, you MUST provide a `dest` map, since
 * the default `dest` will only be a standard ES6 Map.
 *
 * @example
 * ```ts tangle:../export/invert.ts
 * import { invertMap } from "@thi.ng/associative";
 *
 * console.log(
 *   invertMap(new Map([["a", 1], ["b", 2]]))
 * );
 * // Map { 1 => 'a', 2 => 'b' }
 * ```
 *
 * @param src - map to invert
 * @param dest - result map
 */
export const invertMap = <K, V>(src: Map<K, V>, dest?: Map<V, K>) => {
	dest = dest || new Map();
	for (let p of src) {
		dest.set(p[1], p[0]);
	}
	return dest;
};

/**
 * Returns a new object in which the original values are used as keys
 * and original keys as values. If `dest` is given, writes results in
 * that object instead.
 *
 * @example
 * ```ts tangle:../export/invert.ts
 * import { invertObj } from "@thi.ng/associative";
 *
 * console.log(
 *   invertObj({ a: 1, b: 2 })
 * );
 * // { '1': 'a', '2': 'b' }
 * ```
 *
 * @param src - object to invert
 * @param dest - result object
 */
export const invertObj = (
	src: IObjectOf<PropertyKey>,
	dest: IObjectOf<PropertyKey> = {}
) => {
	for (let k in src) {
		dest[<any>src[k]] = k;
	}
	return dest;
};
