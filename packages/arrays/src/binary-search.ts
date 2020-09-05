import type { Comparator, Fn, FnU2 } from "@thi.ng/api";
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
 * @param buf - array
 * @param x - search value
 * @param key - key function
 * @param cmp - comparator
 * @param low - min index
 * @param high - max index
 */
export const binarySearch = <A, B>(
    buf: ArrayLike<A>,
    x: A,
    key: Fn<A, B> = (x) => <any>x,
    cmp: Comparator<B> = compare,
    low = 0,
    high = buf.length - 1
) => {
    const kx = key(x);
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
 * @param buf - array
 * @param x - search value
 * @param cmp - comparator
 * @param low - min index
 * @param high - max index
 */
export const binarySearchNumeric = (
    buf: ArrayLike<number>,
    x: number,
    cmp: Comparator<number> = compareNumAsc,
    low = 0,
    high = buf.length - 1
) => {
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

/**
 * Non-recursive, optimized binary search for fixed size numeric arrays of 4
 * values. Returns index of `x` or `-index-1` if not found.
 *
 * @param buf
 * @param x
 */
export const binarySearch4 = (buf: ArrayLike<number>, x: number) => {
    let idx = buf[2] <= x ? 2 : 0;
    idx |= buf[idx + 1] <= x ? 1 : 0;
    return buf[idx] === x ? idx : -idx - 1;
};

/**
 * Non-recursive, optimized binary search for fixed size numeric arrays of 8
 * values. Returns index of `x` or `-index-1` if not found.
 *
 * @param buf
 * @param x
 */
export const binarySearch8 = (buf: ArrayLike<number>, x: number) => {
    let idx = buf[4] <= x ? 4 : 0;
    idx |= buf[idx + 2] <= x ? 2 : 0;
    idx |= buf[idx + 1] <= x ? 1 : 0;
    return buf[idx] === x ? idx : -idx - 1;
};

/**
 * Non-recursive, optimized binary search for fixed size numeric arrays of 16
 * values. Returns index of `x` or `-index-1` if not found.
 *
 * @param buf
 * @param x
 */
export const binarySearch16 = (buf: ArrayLike<number>, x: number) => {
    let idx = buf[8] <= x ? 8 : 0;
    idx |= buf[idx + 4] <= x ? 4 : 0;
    idx |= buf[idx + 2] <= x ? 2 : 0;
    idx |= buf[idx + 1] <= x ? 1 : 0;
    return buf[idx] === x ? idx : -idx - 1;
};

/**
 * Non-recursive, optimized binary search for fixed size numeric arrays of 32
 * values. Returns index of `x` or `-index-1` if not found.
 *
 * @param buf
 * @param x
 */
export const binarySearch32 = (buf: ArrayLike<number>, x: number) => {
    let idx = buf[16] <= x ? 16 : 0;
    idx |= buf[idx + 4] <= x ? 8 : 0;
    idx |= buf[idx + 4] <= x ? 4 : 0;
    idx |= buf[idx + 2] <= x ? 2 : 0;
    idx |= buf[idx + 1] <= x ? 1 : 0;
    return buf[idx] === x ? idx : -idx - 1;
};

/**
 * {@link binarySearch} result index classifier for predecessor queries.
 * Returns index of last item less than search value or -1 if no such
 * values exist.
 *
 * @example
 * ```ts
 * bsLT(binarySearch([10, 20, 30, 40], 25))
 * // 1
 * ```
 *
 * @param i - binarySearch result index
 */
export const bsLT = (i: number) => (i < 0 ? -i - 2 : i - 1);

/**
 * Similar to {@link bsLT}, but for less-than-equals queries.
 *
 * @param i - binarySearch result index
 */
export const bsLE = (i: number) => (i < 0 ? -i - 2 : i);

/**
 * {@link binarySearch} result index classifier for successor queries.
 * Returns index of first item greater than search value or -1 if no
 * such values exist.
 *
 * @example
 * ```ts
 * src = [10, 20, 30, 40];
 *
 * bsGT(binarySearch(src, 25), src.length)
 * // 2
 *
 * bsGT(binarySearch(src, 40), src.length)
 * // -1
 * ```
 *
 * @param i - binarySearch result index
 * @param n - array length
 */
export const bsGT: FnU2<number> = (i, n) => (
    (i = i < 0 ? -i - 1 : i + 1), i < n ? i : -1
);

/**
 * Similar to {@link bsGT}, but for greater-than-equals queries.
 *
 * @param i - binarySearch result index
 * @param n - array length
 */
export const bsGE: FnU2<number> = (i, n) => (
    (i = i < 0 ? -i - 1 : i), i < n ? i : -1
);

/**
 * {@link binarySearch} result index classifier for equals queries.
 * Merely syntax sugar, casting any non-found result indices to -1.
 *
 * @param i - binarySearch result index
 */
export const bsEQ = (i: number) => (i < 0 ? -1 : i);
