/**
 * Returns first element of given array or `undefined` if array is empty.
 *
 * @param buf - array
 */
export const first = <T>(buf: ArrayLike<T>) => buf[0];

/**
 * Returns last element of given array or `undefined` if array is empty.
 *
 * @param buf - array
 */
export const peek = <T>(buf: ArrayLike<T>) => buf[buf.length - 1];
