/**
 * Inserts `x` into `buf` at index `i` and ensures that array length doesn't
 * grow beyond max `k` items (default: unbounded).
 *
 * @remarks
 * The function will have no effect iff `i<0` or `i>=k` or `k<1`. If
 * `buf.length` is larger than `k`, only the index range [i..k) will be
 * modified.
 *
 * In benchmarking with 8, 16, 32, 64 element arrays, this function is
 * consistently 7-16x faster than `Array.prototype.copyWithin`. See
 * `/bench/insert.ts`
 *
 * @param buf
 * @param x
 * @param i
 * @param k
 */
export const insert = <T>(buf: T[], x: T, i: number, k = Infinity) =>
    i < 0 || i >= k || k < 1 ? buf : insertUnsafe(buf, x, i, k);

/**
 * Same as {@link insert} but without any bounds/index checks.
 *
 * @param buf
 * @param x
 * @param i
 * @param k
 */
export const insertUnsafe = <T>(buf: T[], x: T, i: number, k = Infinity) => {
    let j = buf.length < k ? buf.length + 1 : k;
    for (; --j > i; ) buf[j] = buf[j - 1];
    buf[i] = x;
    return buf;
};
