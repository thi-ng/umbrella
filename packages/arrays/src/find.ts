import { Predicate2 } from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";

/**
 * Similar to `Array.find()`, but uses thi.ng/equiv as default
 * predicate.
 *
 * @param src
 * @param x
 * @param equiv
 */
export const find = <T>(
    src: ArrayLike<T>,
    x: T,
    equiv: Predicate2<T> = _equiv
) => {
    const i = findIndex(src, x, equiv);
    return i !== -1 ? src[i] : undefined;
};

/**
 * Similar to `Array.findIndex()`, but uses thi.ng/equiv as default
 * predicate.
 *
 * @param src
 * @param x
 * @param equiv
 */
export const findIndex = <T>(
    src: ArrayLike<T>,
    x: T,
    equiv: Predicate2<T> = _equiv
) => {
    for (let i = src.length; --i >= 0; ) {
        if (equiv(x, src[i])) return i;
    }
    return -1;
};
