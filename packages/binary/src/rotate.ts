import { Bit } from "./api";

/**
 * Rotates `x` `n` bits to the left.
 *
 * @param x
 * @param n
 */
export const rotateLeft = (x: number, n: Bit) =>
    ((x << n) | (x >>> (32 - n))) >>> 0;

/**
 * Rotates `x` `n` bits to the right.
 *
 * @param x
 * @param n
 */
export const rotateRight = (x: number, n: Bit) =>
    ((x >>> n) | (x << (32 - n))) >>> 0;
