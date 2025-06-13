import { ensureIndex } from "@thi.ng/errors/out-of-bounds";

/**
 * Similar to {@link swizzle}, but immediate and bounds-checked. Takes an array
 * of `table` values and an array of indices `ids`. Returns an array of
 * looked-up values for given IDs, ensuring each index is valid (otherwise
 * throws an error).
 *
 * @example
 * ```ts tangle:../export/lookup.ts
 * import { lookup } from "@thi.ng/arrays";
 *
 * console.log(lookup([10,20,30], [2,2,0,1,1]));
 * // [30, 30, 10, 20, 20]
 *
 * console.log(lookup([10,20,30], [3]));
 * // error: index out of bounds: 3
 * ```
 *
 * @param table
 * @param ids
 */
export const lookup = <T>(table: ArrayLike<T>, ids: number[]) =>
	ids.map((i) => (ensureIndex(i, 0, table.length), table[i]));

/**
 * Non-bounds-checked version of {@link lookup}.
 *
 * @param table
 * @param ids
 */
export const lookupUnsafe = <T>(table: ArrayLike<T>, ids: number[]) =>
	ids.map((i) => table[i]);
