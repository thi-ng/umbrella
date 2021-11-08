import type { Predicate2 } from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";

/**
 * Similar to `Array.find()`, but uses {@link @thi.ng/equiv#equiv} as
 * default predicate.
 *
 * @param buf - array
 * @param x - search value
 * @param equiv - equivalence predicate
 */
export const find = <T>(
    buf: ArrayLike<T>,
    x: T,
    equiv: Predicate2<T> = _equiv
) => {
    const i = findIndex(buf, x, equiv);
    return i !== -1 ? buf[i] : undefined;
};

/**
 * Similar to `Array.findIndex()`, but uses {@link @thi.ng/equiv#equiv}
 * as default predicate.
 *
 * @param buf - array
 * @param x - search value
 * @param equiv - equivalence predicate
 */
export const findIndex = <T>(
    buf: ArrayLike<T>,
    x: T,
    equiv: Predicate2<T> = _equiv
) => {
    for (let i = buf.length; i-- > 0; ) {
        if (equiv(x, buf[i])) return i;
    }
    return -1;
};
