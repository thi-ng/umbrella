import { Reducer } from "../api";
import { reducer } from "../reduce";

export function last<T>(): Reducer<T, T> {
    return reducer(() => undefined, (_, x) => x);
}
