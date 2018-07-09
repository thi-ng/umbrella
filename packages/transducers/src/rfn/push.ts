import { Reducer } from "../api";
import { reducer } from "../reduce";

export function push<T>(): Reducer<T[], T> {
    return reducer(() => [], (acc, x) => (acc.push(x), acc));
}
