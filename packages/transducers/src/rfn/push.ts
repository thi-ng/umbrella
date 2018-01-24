import { Reducer } from "../api";

export function push<T>(): Reducer<T[], T> {
    return [
        () => [],
        (acc) => acc,
        (acc, x) => (acc.push(x), acc),
    ];
}
