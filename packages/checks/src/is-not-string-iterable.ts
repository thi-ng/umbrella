export const isNotStringAndIterable = (x: any): x is Iterable<any> =>
	x != null &&
	typeof x !== "string" &&
	typeof x[Symbol.iterator] === "function";
