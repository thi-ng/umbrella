import type { Comparator, Fn3, TypedArray } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import { swap } from "./swap.js";

/**
 * In-place quicksort implementation with optional comparator & index
 * based swap function, useful for sorting multiple related arrays in
 * parallel, based on a single sort criteria.
 *
 * @remarks
 * Supports sorting of sub-ranges only, via optionally given
 * `start`/`end` indices (both inclusive).
 *
 * Uses Hoare partitioning scheme. {@link @thi.ng/compare#compare} is
 * used as default comparator and {@link swap} from this package as
 * default swap function. Also see {@link multiSwap}.
 *
 * {@link https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme}
 *
 * @example
 * ```ts
 * a = [4, 3, 1, 8, 5]
 * b = [40, 30, 10, 80, 50]
 * c = [-4, -3, -1, -8, -5]
 *
 * // use `multiSwap` to sort extra arrays based on sort order of `a`
 * quickSort(a, undefined, multiSwap(b, c))
 * // [ 1, 3, 4, 5, 8 ] (a)
 *
 * b
 * // [ 10, 30, 40, 50, 80 ]
 * c
 * // [ -1, -3, -4, -5, -8 ]
 * ```
 *
 * @param arr - array to sort
 * @param _cmp - comparator
 * @param _swap - swap function
 * @param start - start index
 * @param end - end index (inclusive)
 */
// prettier-ignore
export function quickSort<T>(arr: T[], _cmp?: Comparator<T>, _swap?: Fn3<T[], number, number, void>, start?: number, end?: number): T[];
// prettier-ignore
export function quickSort<T extends TypedArray>(arr: T, _cmp?: Comparator<number>, _swap?: Fn3<T, number, number, void>, start?: number, end?: number): T;
// prettier-ignore
export function quickSort(arr: any, _cmp: Comparator<any> = compare, _swap: Fn3<any, number, number, void> = swap, start = 0, end = arr.length - 1): any {
    if (start < end) {
        const pivot = arr[start + ((end - start) >> 1)];
        let s = start - 1;
        let e = end + 1;

        while (true) {
            do {
                s++;
            } while (_cmp(arr[s], pivot) < 0);
            do {
                e--;
            } while (_cmp(arr[e], pivot) > 0);
            if (s >= e) break;
            _swap(arr, s, e);
        }

        quickSort(arr, _cmp, _swap, start, e);
        quickSort(arr, _cmp, _swap, e + 1, end);
    }
    return arr;
}
