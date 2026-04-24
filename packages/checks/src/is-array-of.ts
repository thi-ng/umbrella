/**
 * Higher order predicate to check if a given value is an array of `T`. Takes
 * `pred` to check single array items.
 *
 * @remarks
 * Uses `Array.prototype.every()` with additional pre-check.
 *
 * Also see {@link isSetOf} for Sets.
 *
 * @param pred
 */
export const isArrayOf =
	<T>(pred: (x: any) => boolean) =>
	(x: any): x is Array<T> =>
		Array.isArray(x) && x.every(pred);
