import { Reducer } from "../api";

export function frequencies<T>(): Reducer<Map<T, number>, T> {
    return [
        () => new Map(),
        (acc) => acc,
        (acc, x) => acc.set(x, acc.has(x) ? acc.get(x) + 1 : 1)
    ];
}
