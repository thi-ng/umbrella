import { Reducer } from "../api";

export function max(): Reducer<number, number> {
    return [
        () => Number.NEGATIVE_INFINITY,
        (acc) => acc,
        (acc, x) => Math.max(acc, x),
    ];
}
