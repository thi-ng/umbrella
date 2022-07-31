import type { Fn } from "@thi.ng/api";

/**
 * Returns optimized function to immutably select, repeat, reshape and /
 * or reorder array / object values in the specified index order.
 *
 * @remarks
 * Fast paths for up to 8 indices are provided, before a loop based
 * approach is used.
 *
 * @example
 * ```ts
 * swizzle([0, 0, 0])([1, 2, 3, 4])    // [ 1, 1, 1 ]
 * swizzle([1, 1, 3, 3])([1, 2, 3, 4]) // [ 2, 2, 4, 4 ]
 * swizzle([2, 0])([1, 2, 3])          // [ 3, 1 ]
 * ```
 *
 * @example
 * Objects can be used as input to the generated function, but the
 * result will always be in array form.

 * ```ts
 * swizzle(["a", "c", "b"])({a: 1, b: 2, c: 3}) // [ 1, 3, 2 ]
 * ```
 *
 * @param order - indices
 */
export const swizzle = <T>(order: string | PropertyKey[]): Fn<T, any[]> => {
	const [a, b, c, d, e, f, g, h] = order;
	switch (order.length) {
		case 0:
			return () => [];
		case 1:
			return (x: any) => [x[a]];
		case 2:
			return (x: any) => [x[a], x[b]];
		case 3:
			return (x: any) => [x[a], x[b], x[c]];
		case 4:
			return (x: any) => [x[a], x[b], x[c], x[d]];
		case 5:
			return (x: any) => [x[a], x[b], x[c], x[d], x[e]];
		case 6:
			return (x: any) => [x[a], x[b], x[c], x[d], x[e], x[f]];
		case 7:
			return (x: any) => [x[a], x[b], x[c], x[d], x[e], x[f], x[g]];
		case 8:
			return (x: any) => [x[a], x[b], x[c], x[d], x[e], x[f], x[g], x[h]];
		default:
			return (x: any) => {
				const res = [];
				for (let i = order.length; i-- > 0; ) {
					res[i] = x[order[i]];
				}
				return res;
			};
	}
};
