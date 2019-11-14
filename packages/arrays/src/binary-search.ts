import { Comparator, Fn } from "@thi.ng/api";
import { compare, compareNumAsc } from "@thi.ng/compare";

/**
 * Returns the supposed index of `x` in pre-sorted array-like collection
 * `buf`.
 *
 * @remarks
 * If `x` can't be found, returns `-index-1`, representing the negative
 * of the index, were `x` to be inserted into `buf`. E.g if the return
 * value is -3, `x` would appear/insert at index 2.
 *
 * The optional `key` function is used to obtain the actual sort value
 * of `x` and each array item (default: identity).
 *
 * The optional `cmp` comparator (default:
 * {@link @thi.ng/compare#compare}) is then used to identify the index
 * of `x`. The sort order of `buf` MUST be compatible with that of
 * `cmp`.
 *
 * @example
 * ```ts
 * binarySearch([2, 4, 6], 5);
 * // -3
 * ```
 *
 * @param buf -
 * @param x -
 * @param key -
 * @param cmp -
 */
export const binarySearch = <A, B>(
    buf: ArrayLike<A>,
    x: A,
    key: Fn<A, B> = (x) => <any>x,
    cmp: Comparator<B> = compare
) => {
    const kx = key(x);
    let low = 0;
    let high = buf.length - 1;
    while (low <= high) {
        const mid = (low + high) >>> 1;
        const c = cmp(key(buf[mid]), kx);
        if (c < 0) {
            low = mid + 1;
        } else if (c > 0) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -low - 1;
};

/**
 * Similar to {@link binarySearch}, but optimized for numeric arrays and
 * supporting custom comparators (default:
 * {@link @thi.ng/compare#compareNumAsc}).
 *
 * @param buf -
 * @param x -
 * @param cmp -
 */
export const binarySearchNumeric = (
    buf: ArrayLike<number>,
    x: number,
    cmp: Comparator<number> = compareNumAsc
) => {
    let low = 0;
    let high = buf.length - 1;
    while (low <= high) {
        const mid = (low + high) >>> 1;
        const c = cmp(buf[mid], x);
        if (c < 0) {
            low = mid + 1;
        } else if (c > 0) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -low - 1;
};
