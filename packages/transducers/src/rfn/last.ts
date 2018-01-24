import { Reducer } from "../api";

export function last<T>(): Reducer<T, T> {
    return [
        () => undefined,
        (acc) => acc,
        (_, x) => x,
    ];
}
