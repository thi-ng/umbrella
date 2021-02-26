/**
 * Returns new vector of `size` with all components set to `n` (default: 0).
 *
 * @param size -
 * @param n -
 */
export const vecOf = (size: number, n = 0) => new Array(size).fill(n);

/**
 * Returns new one-hot vector of given `size` with `hot` element index (in
 * `[0..size)` range).
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/One-hot
 *
 * @param size -
 * @param hot -
 */
export const oneHot = (size: number, hot: number) => {
    const res = vecOf(size);
    res[hot] = 1;
    return res;
};
