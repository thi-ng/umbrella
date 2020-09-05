import type { FnN } from "@thi.ng/api";

/**
 * Repeats lowest nibble of `x` as 24 bit uint.
 *
 * @param x -
 */
export const splat4_24: FnN = (x) => (x & 0xf) * 0x111111;

/**
 * Repeats lowest nibble of `x` as 32 bit uint.
 *
 * @param x -
 */
export const splat4_32: FnN = (x) => ((x & 0xf) * 0x11111111) >>> 0;

/**
 * Repeats lowest byte of `x` as 24 bit uint.
 *
 * @param x -
 */
export const splat8_24: FnN = (x) => (x & 0xff) * 0x010101;

/**
 * Repeats lowest byte of `x` as 32 bit uint.
 *
 * @param x -
 */
export const splat8_32: FnN = (x) => ((x & 0xff) * 0x01010101) >>> 0;

/**
 * Repeats lowest 16bit of `x` as 32 bit uint.
 *
 * @param x -
 */
export const splat16_32: FnN = (x) => ((x &= 0xffff), ((x << 16) | x) >>> 0);

/**
 * Returns true if bits 0-3 are same as bits 4-7.
 *
 * @param x -
 */
export const same4 = (x: number) => ((x >> 4) & 0xf) === (x & 0xf);

/**
 * Returns true if bits 0-7 are same as bits 8-15.
 *
 * @param x -
 */
export const same8 = (x: number) => ((x >> 8) & 0xff) === (x & 0xff);
