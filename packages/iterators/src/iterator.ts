export const iterator = <T>(x: Iterable<T>) => x[Symbol.iterator]();

export const maybeIterator = (x: any) =>
	(x != null && x[Symbol.iterator] && x[Symbol.iterator]()) || undefined;
