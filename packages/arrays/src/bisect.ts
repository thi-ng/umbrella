import type { Predicate } from "@thi.ng/api";

/**
 * Splits array at given index (default: floor(src.length/2)) and returns tuple of [lhs, rhs].
 *
 * @param src
 * @param i
 */
export const bisect = <T>(src: T[], i = src.length >>> 1) => [
    src.slice(0, i),
    src.slice(i),
];

/**
 * Similar to {@link bisect}, but first finds split index via provided
 * predicate. The item for which the predicate first returns a truthy result,
 * will be the first item in the RHS array. If the predicate never succeeds, the
 * function returns `[src, []]`, i.e. all items will remain in the LHS.
 *
 * @param src
 * @param pred
 */
export const bisectWith = <T>(src: T[], pred: Predicate<T>) => {
    const i = src.findIndex(pred);
    return i >= 0 ? bisect(src, i) : [src, []];
};
