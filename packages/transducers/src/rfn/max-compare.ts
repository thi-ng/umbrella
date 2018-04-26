import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/api/compare";

import { Reducer } from "../api";

export function maxCompare<T>(ident: () => T, cmp: Comparator<T> = compare): Reducer<T, T> {
    return [
        ident,
        (acc) => acc,
        (acc, x) => cmp(acc, x) >= 0 ? acc : x
    ];
}
