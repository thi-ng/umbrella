import { Predicate } from "@thi.ng/api";

import { Transducer } from "../api";
import { comp } from "../func/comp";
import { filter } from "./filter";
import { takeLast } from "./take-last";

/**
 * Transducer composition / syntax sugar for:
 *
 *     comp(filter(pred), takeLast(1))
 *
 * Yields none or only the last value which passed the predicate check.
 *
 * @param pred
 */
export function matchLast<T>(pred: Predicate<T>): Transducer<T, T> {
    return comp(filter(pred), takeLast(1));
}
