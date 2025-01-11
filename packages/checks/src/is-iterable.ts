export const isIterable = <T = any>(x: any): x is Iterable<T> =>
	typeof x?.[Symbol.iterator] === "function";
