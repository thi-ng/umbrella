import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/compare";

import { Reducer } from "../api";
import { reducer } from "../reduce";

export function maxCompare<T>(init: () => T, cmp: Comparator<T> = compare): Reducer<T, T> {
    return reducer(init, (acc, x) => cmp(acc, x) >= 0 ? acc : x);
}
