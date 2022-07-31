export const isIterable = (x: any): x is Iterable<any> =>
	x != null && typeof x[Symbol.iterator] === "function";
