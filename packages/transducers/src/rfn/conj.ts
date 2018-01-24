import { Reducer } from "../api";

export function conj<T>(): Reducer<Set<T>, T> {
    return [
        () => new Set(),
        (acc) => acc,
        (acc, x) => acc.add(x),
    ];
}
