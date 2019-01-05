/**
 * Returns last element of given array.
 *
 * @param x
 */
export const peek =
    <T>(x: ArrayLike<T>) => x[x.length - 1];
