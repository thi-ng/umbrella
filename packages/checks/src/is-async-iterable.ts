export const isAsyncIterable = (x: any): x is AsyncIterable<any> =>
	x != null && typeof x[Symbol.asyncIterator] === "function";
