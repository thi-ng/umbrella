export const first = <T>(x: Iterable<T>) => x[Symbol.iterator]().next().value;
