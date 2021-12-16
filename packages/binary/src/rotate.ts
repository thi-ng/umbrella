import type { Bit } from "./api.js";

/**
 * Rotates `x` `n` bits to the left.
 *
 * @param x - value
 * @param n - rotation step
 */
export const rotateLeft = (x: number, n: Bit) =>
    ((x << n) | (x >>> (32 - n))) >>> 0;

/**
 * Rotates `x` `n` bits to the right.
 *
 * @param x - value
 * @param n - rotation step
 */
export const rotateRight = (x: number, n: Bit) =>
    ((x >>> n) | (x << (32 - n))) >>> 0;

/**
 * Shifts `x` by `n` bits left or right. If `n` >= 0, the value will be `>>>`
 * shifted to right, if `n` < 0 the value will be shifted left.
 *
 * @param x
 * @param n
 */
export const shiftRL = (x: number, n: number) => (n < 0 ? x << -n : x >>> n);
