import { Reducer } from "../api";
import { reduce, reducer } from "../reduce";

export function last<T>(): Reducer<T, T>;
export function last<T>(xs: Iterable<T>): T;
export function last<T>(xs?: Iterable<T>): any {
    return xs ?
        reduce(last(), xs) :
        reducer(() => undefined, (_, x) => x);
}
