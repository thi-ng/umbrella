import { Reducer } from "../api";

export function mul(): Reducer<number, number> {
    return [
        () => 1,
        (acc) => acc,
        (acc, x) => acc * x,
    ];
}
