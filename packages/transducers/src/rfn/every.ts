import { Predicate } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer } from "../reduce";
import { reduced } from "../reduced";

export function every<T>(pred?: Predicate<T>): Reducer<boolean, T> {
    return reducer(
        () => true,
        pred ?
            (acc, x) => (pred(x) ? acc : reduced(false)) :
            (acc, x) => (x ? acc : reduced(false))
    );
}
