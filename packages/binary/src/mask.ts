import { MASKS } from "./api";

/**
 * Creates bit mask by enabling bit `a` to bit `b-1`, both in range
 * 0-32. `b` MUST be >= `a`.
 *
 * ```
 * defMask(1,31).toString(16) // 7ffffffe
 * defMask(3,8).toString(16)  // f8
 * ```
 *
 * @param a
 * @param b
 */
export const defMask = (a: number, b: number) =>
    ((~MASKS[a]) & MASKS[b]) >>> 0;

/**
 * Returns unsigned version of `x` with only lowest `n` bits.
 *
 * @param n
 * @param x
 */
export const maskL = (n: number, x: number) =>
    (x & MASKS[n]) >>> 0;

/**
 * Returns unsigned version of `x` with only highest `n` bits.
 *
 * @param n
 * @param x
 */
export const maskH = (n: number, x: number) =>
    (x & ~MASKS[n]) >>> 0;
