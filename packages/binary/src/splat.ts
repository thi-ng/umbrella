/**
 * Repeats lowest nibble of `x` as 24 bit uint.
 *
 * @param x
 */
export const splat4_24 = (x: number) =>
    (x &= 0xf, splat8_24(x | x << 4));

/**
 * Repeats lowest nibble of `x` as 32 bit uint.
 *
 * @param x
 */
export const splat4_32 = (x: number) =>
    (x &= 0xf, splat8_32(x | x << 4));

/**
 * Repeats lowest byte of `x` as 24 bit uint.
 *
 * @param x
 */
export const splat8_24 = (x: number) =>
    (x & 0xff) * 0x010101;

/**
 * Repeats lowest byte of `x` as 32 bit uint.
 *
 * @param x
 */
export const splat8_32 = (x: number) =>
    ((x & 0xff) * 0x01010101) >>> 0;

/**
 * Repeats lowest 16bit of `x` as 32 bit uint.
 *
 * @param x
 */
export const splat16_32 = (x: number) =>
    (x &= 0xffff, ((x << 16) | x) >>> 0);

/**
 * Returns true if bits 0-3 are same as bits 4-7.
 *
 * @param x
 */
export const same4 = (x: number) =>
    (x >> 4 & 0xf) === (x & 0xf);

/**
 * Returns true if bits 0-7 are same as bits 8-15.
 *
 * @param x
 */
export const same8 = (x: number) =>
    (x >> 8 & 0xff) === (x & 0xff);
