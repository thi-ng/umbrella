import { Reducer } from "../api";

export function mean(): Reducer<number, number> {
    let n = 0;
    return [
        () => 0,
        (acc) => acc / n,
        (acc, x) => (n++ , acc + x),
    ];
}
