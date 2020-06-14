import { reducer } from "../reduce";
import type { Reducer } from "../api";

export const pushCopy = <T>(): Reducer<T[], T> =>
    reducer<T[], T>(
        () => [],
        (acc, x) => ((acc = acc.slice()).push(x), acc)
    );
