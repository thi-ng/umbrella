import { Predicate } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reduced } from "../reduced";

export function every<T>(pred?: Predicate<T>): Reducer<boolean, T> {
    return [
        () => true,
        (acc) => acc,
        pred ?
            (acc, x) => (pred(x) ? acc : reduced(false)) :
            (acc, x) => (x ? acc : reduced(false))
    ];
}
