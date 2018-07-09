import { Reducer } from "../api";
import { reducer } from "../reduce";

export function conj<T>(): Reducer<Set<T>, T> {
    return reducer(() => new Set(), (acc, x) => acc.add(x));
}
