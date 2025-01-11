export const isAsyncIterable = <T = any>(x: any): x is AsyncIterable<T> =>
	typeof x?.[Symbol.asyncIterator] === "function";
