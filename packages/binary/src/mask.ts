// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import { MASKS } from "./constants.js";

/**
 * Creates bit mask by enabling bit `a` to bit `b-1`, both in range
 * 0-32. `b` MUST be >= `a`.
 *
 * @example
 * ```ts tangle:../export/mask.ts
 * import { defMask } from "@thi.ng/binary";
 * import { U32 } from "@thi.ng/hex";
 *
 * console.log(
 *   U32(defMask(1,31))
 * );
 * // 7ffffffe
 *
 * console.log(
 *   U32(defMask(3,8))
 * );
 * // 000000f8
 * ```
 *
 * @param a - first bit
 * @param b - last bit
 */
export const defMask: FnU2<number> = (a, b) => (~MASKS[a] & MASKS[b]) >>> 0;

/**
 * Returns unsigned version of `x` with only lowest `n` bits.
 *
 * @param n - number of LSB bits
 * @param x - value
 */
export const maskL: FnU2<number> = (n, x) => (x & MASKS[n]) >>> 0;

/**
 * Returns unsigned version of `x` with only highest `n` bits.
 *
 * @param n - number of MSB bits
 * @param x - value
 */
export const maskH: FnU2<number> = (n, x) => (x & ~MASKS[n]) >>> 0;
