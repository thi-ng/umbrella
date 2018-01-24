import { Reducer } from "../api";

export function pushCopy<T>(): Reducer<T[], T> {
    return [
        () => [],
        (acc) => acc,
        (acc, x) => ((acc = acc.slice()).push(x), acc)
    ];
}
