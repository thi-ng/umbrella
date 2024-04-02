export const isAsyncIterable = <T = any>(x: any): x is AsyncIterable<T> =>
	x != null && typeof x[Symbol.asyncIterator] === "function";
