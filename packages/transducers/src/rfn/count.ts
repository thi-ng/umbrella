import { Reducer } from "../api";

export function count(offset = 0, step = 1): Reducer<number, any> {
    return [
        () => offset,
        (acc) => acc,
        (acc, _) => acc + step,
    ];
}
