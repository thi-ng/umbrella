export const isArrayLike = <T = any>(x: any): x is ArrayLike<T> =>
	x != null && typeof x !== "function" && x.length !== undefined;
