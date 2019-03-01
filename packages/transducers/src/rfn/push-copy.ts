import { Reducer } from "../api";
import { reducer } from "../reduce";

export const pushCopy = <T>(): Reducer<T[], T> =>
    reducer(() => [], (acc, x) => ((acc = acc.slice()).push(x), acc));
