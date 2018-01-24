import { Reducer } from "../api";

export function min(): Reducer<number, number> {
    return [
        () => Number.POSITIVE_INFINITY,
        (acc) => acc,
        (acc, x) => Math.min(acc, x),
    ];
}
