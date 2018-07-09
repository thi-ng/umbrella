import { Reducer } from "../api";
import { reducer } from "../reduce";

export function pushCopy<T>(): Reducer<T[], T> {
    return reducer(() => [], (acc, x) => ((acc = acc.slice()).push(x), acc));
}
