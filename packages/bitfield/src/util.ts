import { popCount as $popCount } from "@thi.ng/binary";
import { B32 } from "@thi.ng/strings";
import type { Fn2 } from "@thi.ng/api";

/**
 * Converts 1D bitfield to binary string.
 *
 * @param data -
 *
 * @internal
 */
export const toString = (data: Uint32Array) => [...data].map(B32).join("");

/**
 * @param dest -
 * @param src -
 * @param op -
 *
 * @internal
 */
export const binOp = (
    dest: Uint32Array,
    src: Uint32Array,
    op: Fn2<number, number, number>
) => {
    for (let i = src.length; --i >= 0; ) dest[i] = op(src[i], dest[i]);
};

/**
 * Returns number of set bits (1's) in the given array (index range).
 *
 * @param data
 * @param i
 * @param n
 *
 * @internal
 **/
export const popCount = (data: Uint32Array, i = 0, n = data.length) => {
    let num = 0;
    for (let m = i + n; i < m; i++) {
        const x = data[i];
        x > 0 && (num += $popCount(x));
    }
    return num;
};
