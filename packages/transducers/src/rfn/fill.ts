import { NumericArray } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer } from "../reduce";

/**
 * Reducer which starts filling array with results from given `start`
 * index (default: 0).
 *
 * @param start
 */
export function fill<T>(start = 0): Reducer<T[], T> {
    return reducer(() => [], (acc, x) => (acc[start++] = x, acc));
}

/**
 * Like `fill()` reducer, but for numeric arrays (incl. typed arrays).
 *
 * @param start
 */
export function fillN(start = 0): Reducer<NumericArray, number> {
    return fill<number>(start);
}
