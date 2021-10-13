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
