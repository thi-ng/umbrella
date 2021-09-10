import type { Comparator, Fn0 } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import type { Reducer } from "../api";
import { $$reduce, reducer } from "../reduce";

export function maxCompare<T>(init: Fn0<T>, cmp?: Comparator<T>): Reducer<T, T>;
export function maxCompare<T>(init: Fn0<T>, xs: Iterable<T>): T;
export function maxCompare<T>(
    init: Fn0<T>,
    cmp: Comparator<T>,
    xs: Iterable<T>
): T;
export function maxCompare(...args: any[]): any {
    const res = $$reduce(maxCompare, args);
    if (res !== undefined) {
        return res;
    }
    const init = args[0];
    const cmp = args[1] || compare;
    return reducer(init, (acc, x) => (cmp(acc, x) >= 0 ? acc : x));
}
