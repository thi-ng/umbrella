import type { AnyArray, SwapFn } from "./api.js";

/**
 * Swaps values at index `x`/`y` in given array.
 *
 * @param arr - array
 * @param x - first index
 * @param y - other index
 */
export const swap = (arr: AnyArray, x: number, y: number) => {
    const t = arr[x];
    arr[x] = arr[y];
    arr[y] = t;
};

/**
 * Higher-order version of {@link swap} for swapping elements in
 * multiple arrays at once and hence useful for sorting multiple arrays
 * based on a single criteria.
 *
 * @remarks
 * The returned function takes the same args as `swap`, and when called
 * swaps 2 elements in the array given to that function AND in the
 * arrays given to {@link multiSwap} itself. Provides fast routes for up to 3
 * extra arrays, then falls back to a loop-based approach.
 *
 * {@link (quickSort:1)}
 *
 * @example
 * ```ts
 * a = [2, 1];
 * b = [20, 10];
 * c = [40, 30];
 *
 * ms = multiSwap(b, c);
 * ms(a, 0, 1);
 *
 * // a: [1, 2]
 * // b: [10, 20]
 * // c: [30, 40]
 * ```
 *
 * @param xs - arrays to swap in later
 */
export const multiSwap = (...xs: AnyArray[]): SwapFn => {
    const [b, c, d] = xs;
    const n = xs.length;
    switch (n) {
        case 0:
            return swap;
        case 1:
            return (a, x, y) => {
                swap(a, x, y);
                swap(b, x, y);
            };
        case 2:
            return (a, x, y) => {
                swap(a, x, y);
                swap(b, x, y);
                swap(c, x, y);
            };
        case 3:
            return (a, x, y) => {
                swap(a, x, y);
                swap(b, x, y);
                swap(c, x, y);
                swap(d, x, y);
            };
        default:
            return (a, x, y) => {
                swap(a, x, y);
                for (let i = n; i-- > 0; ) swap(xs[i], x, y);
            };
    }
};
