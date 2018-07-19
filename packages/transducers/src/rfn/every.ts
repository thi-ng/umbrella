import { Predicate } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer } from "../reduce";
import { reduced } from "../reduced";

/**
 * Reducer which applies optional `pred` function to each value and
 * terminates early if the predicate returned a falsy result. If no
 * predicate is given the values are checked via JS native truthiness
 * rules (i.e. 0, "", false, null, undefined are all falsy).
 *
 * Returns true if *all* values passed test.
 *
 * ```
 * reduce(every((x)=> x > 0), [1,2,-1,3]);
 * // false
 * ```
 *
 * @param pred
 */
export function every<T>(pred?: Predicate<T>): Reducer<boolean, T> {
    return reducer(
        () => true,
        pred ?
            (acc, x) => (pred(x) ? acc : reduced(false)) :
            (acc, x) => (x ? acc : reduced(false))
    );
}
