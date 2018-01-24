import { Reducer } from "../api";

export function add(): Reducer<number, number> {
    return [
        () => 0,
        (acc) => acc,
        (acc, x) => acc + x,
    ];
}
