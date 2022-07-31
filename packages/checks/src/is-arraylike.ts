export const isArrayLike = (x: any): x is ArrayLike<any> =>
	x != null && typeof x !== "function" && x.length !== undefined;
