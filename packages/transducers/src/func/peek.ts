/**
 * Returns last element of given array.
 *
 * @param x
 */
export function peek<T>(x: ArrayLike<T>) {
    return x[x.length - 1];
}
