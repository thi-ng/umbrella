import { Predicate } from "@thi.ng/api";

import { Transducer } from "../api";
import { comp } from "../func/comp";
import { filter } from "./filter";
import { take } from "./take";

/**
 * Transducer composition / syntax sugar for:
 *
 *     comp(filter(pred), take(1))
 *
 * Yields none or only the first value which passed the predicate check
 * and then causes early termination.
 *
 * @param pred
 */
export function matchFirst<T>(pred: Predicate<T>): Transducer<T, T> {
    return comp(filter(pred), take(1));
}
