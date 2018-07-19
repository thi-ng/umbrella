import { Predicate } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer } from "../reduce";
import { reduced } from "../reduced";

/**
 * Similar to `every()` reducer, but only requires at least 1 value to
 * succeed predicate test (and then immediately terminates with `true`
 * as result).
 *
 * @param pred
 */
export function some<T>(pred?: Predicate<T>): Reducer<boolean, T> {
    return reducer(
        () => false,
        pred ?
            (acc, x) => (pred(x) ? reduced(true) : acc) :
            (acc, x) => (x ? reduced(true) : acc)
    );
}
