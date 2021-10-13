import { mapIndexed } from "./map-indexed.js";

export const indexed = <T>(input: Iterable<T>): IterableIterator<[number, T]> =>
    mapIndexed((i, x) => [i, x], input);
