/**
 * Returns last element of given array or `undefined` if array is empty.
 *
 * @param x
 */
export const peek = <T>(x: ArrayLike<T>) => x[x.length - 1];
