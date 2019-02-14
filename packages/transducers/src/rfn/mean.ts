import { Reducer } from "../api";
import { reduce } from "../reduce";

export function mean(): Reducer<number, number>;
export function mean(xs: Iterable<number>): number;
export function mean(xs?: Iterable<number>): any {
    let n = 0;
    return xs ?
        reduce(mean(), xs) :
        [
            () => 0,
            (acc) => acc / n,
            (acc, x) => (n++ , acc + x),
        ];
}
