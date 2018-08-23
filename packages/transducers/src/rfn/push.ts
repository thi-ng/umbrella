import { Reducer } from "../api";
import { reducer } from "../reduce";

export function push<T>(): Reducer<Set<T>, T>;
export function push<T>(xs: Iterable<T>): Set<T>;
export function push<T>(xs?: Iterable<T>): any {
    return xs ?
        [...xs] :
        reducer(() => [], (acc, x) => (acc.push(x), acc));
}
