export const isIterable = <T = any>(x: any): x is Iterable<T> =>
	x != null && typeof x[Symbol.iterator] === "function";
