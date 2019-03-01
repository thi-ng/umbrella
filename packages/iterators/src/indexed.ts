import { mapIndexed } from "./map-indexed";

export const indexed = <T>(input: Iterable<T>): IterableIterator<[number, T]> =>
    mapIndexed((i, x) => [i, x], input);
