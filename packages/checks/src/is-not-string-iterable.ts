export const isNotStringAndIterable = <T = any>(x: any): x is Iterable<T> =>
	x != null &&
	typeof x !== "string" &&
	typeof x[Symbol.iterator] === "function";
