import { mapIndexed } from "./map-indexed";

export function indexed<T>(input: Iterable<T>): IterableIterator<[number, T]> {
    return mapIndexed((i, x) => [i, x], input);
}
