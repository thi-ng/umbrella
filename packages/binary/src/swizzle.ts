import { Lane2, Lane4, Lane8 } from "./api";

/**
 * Extracts 8-bit lane from given 32bit uint.
 *
 * - Lane #0: bits 24-31
 * - Lane #1: bits 16-23
 * - Lane #2: bits 8-15
 * - Lane #3: bits 0-7
 *
 * @param x
 * @param l
 */
export const lane8 = (x: number, l: Lane8) =>
    (x >>> ((3 - l) << 3)) & 0xff;

/**
 * Extracts 4-bit lane from given 32bit uint.
 *
 * - Lane #0: bits 28-31
 * - Lane #1: bits 24-27
 * - Lane #2: bits 20-23
 * - Lane #3: bits 16-19
 * - Lane #4: bits 12-15
 * - Lane #5: bits 8-11
 * - Lane #6: bits 4-7
 * - Lane #7: bits 0-3
 *
 * @param x
 * @param l
 */
export const lane4 = (x: number, l: Lane4) =>
    (x >>> ((7 - l) << 2)) & 0xf;

export const lane2 = (x: number, l: Lane2) =>
    (x >>> ((15 - l) << 1)) & 0x3;

/**
 * Re-orders byte lanes in given order (MSB).
 *
 * ```
 * swizzle(0x12345678, 3, 2, 1, 0) // 0x78563412
 * swizzle(0x12345678, 1, 0, 3, 2) // 0x34127856
 * swizzle(0x12345678, 2, 2, 0, 0) // 0x56561212
 * ```
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 */
export const swizzle8 = (x: number, a: Lane8, b: Lane8, c: Lane8, d: Lane8) =>
    (
        lane8(x, a) << 24 |
        lane8(x, b) << 16 |
        lane8(x, c) << 8 |
        lane8(x, d)
    ) >>> 0;

/**
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 * @param e
 * @param f
 * @param g
 * @param h
 */
export const swizzle4 = (x: number, a: Lane4, b: Lane4, c: Lane4, d: Lane4, e: Lane4, f: Lane4, g: Lane4, h: Lane4) =>
    (
        lane4(x, a) << 28 |
        lane4(x, b) << 24 |
        lane4(x, c) << 20 |
        lane4(x, d) << 16 |
        lane4(x, e) << 12 |
        lane4(x, f) << 8 |
        lane4(x, g) << 4 |
        lane4(x, h)
    ) >>> 0;

/**
 * Same as `swizzle8(x, 3, 2, 1, 0)`, but faster.
 *
 * @param x
 */
export const flipBytes = (x: number) =>
    ((x >>> 24) | (x >> 8 & 0xff00) | (x & 0xff00) << 8 | x << 24) >>> 0;
