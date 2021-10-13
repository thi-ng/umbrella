import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

export const pushCopy = <T>(): Reducer<T[], T> =>
    reducer<T[], T>(
        () => [],
        (acc, x) => ((acc = acc.slice()).push(x), acc)
    );
