import { Comparator } from "@thi.ng/api/api";

/**
 * Returns the supposed index of `x` in pre-sorted array-like collection
 * `arr`. The `key` function first is used to obtain the actual sort
 * value of `x` and each array item. The `cmp` comparator is then used to
 * identify the index of `x`.
 *
 * @param arr
 * @param key
 * @param cmp
 * @param x
 * @returns index of `x`, else `-index` if item could not be found
 */
export function binarySearch<A, B>(arr: ArrayLike<A>, key: (x: A) => B, cmp: Comparator<B>, x: A) {
    const kx = key(x);
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = (low + high) >>> 1;
        const c = cmp(key(arr[mid]), kx);
        if (c < 0) {
            low = mid + 1;
        } else if (c > 0) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -low;
}
