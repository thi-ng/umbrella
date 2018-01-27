import { Predicate } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reduced } from "../reduced";

export function some<T>(pred?: Predicate<T>): Reducer<boolean, T> {
    return [
        () => false,
        (acc) => acc,
        pred ?
            (acc, x) => (pred(x) ? reduced(true) : acc) :
            (acc, x) => (x ? reduced(true) : acc)
    ];
}
