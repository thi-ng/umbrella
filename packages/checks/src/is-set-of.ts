/**
 * Higher order predicate to check if a given value is a Set of `T`. Takes
 * `pred` to check single items.
 *
 * @remarks
 * Uses same semantics as `Array.prototype.every()`, i.e. also returns true if
 * given an empty set.
 *
 * Also see {@link isArrayOf}, {@link isObjectOf}.
 *
 * @param pred
 */
export const isSetOf =
	<T>(pred: (x: any) => boolean) =>
	(x: any): x is Set<T> => {
		if (!(x instanceof Set)) return false;
		for (let y of x) if (!pred(y)) return false;
		return true;
	};
