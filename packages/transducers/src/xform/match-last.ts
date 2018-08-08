import { Predicate } from "@thi.ng/api";

import { Transducer } from "../api";
import { comp } from "../func/comp";
import { iterator } from "../iterator";
import { filter } from "./filter";
import { takeLast } from "./take-last";

/**
 * Transducer composition / syntax sugar for:
 *
 * ```
 * comp(filter(pred), takeLast(1))
 * ```
 *
 * Yields none or only the last value which passed the predicate check.
 *
 * @param pred predicate function
 * @param src
 */
export function matchLast<T>(pred: Predicate<T>): Transducer<T, T>;
export function matchLast<T>(pred: Predicate<T>, src: Iterable<T>): IterableIterator<T>;
export function matchLast<T>(pred: Predicate<T>, src?: Iterable<T>): any {
    return src ?
        iterator(matchLast(pred), src) :
        comp(filter(pred), takeLast(1));
}
