import type { FnN } from "@thi.ng/api";

/**
 * Converts signed i8 to unsigned u8 value. Input is assumed to be in
 * [-0x80,0x7f] range. Does NOT perform clamping. Branchless.
 *
 * @param x
 * @returns
 */
export const i8u8: FnN = (x) => (x >>> 0) & 0xff;

/**
 * Converts signed i16 to unsigned u16 value. Input is assumed to be in
 * [-0x8000,0x7fff] range. Does NOT perform clamping. Branchless.
 *
 * @param x
 * @returns
 */
export const i16u16: FnN = (x) => (x >>> 0) & 0xffff;

/**
 * Converts signed i32 to unsigned u32 value. Input is assumed to be in i32
 * range.
 *
 * @param x
 * @returns
 */
export const i32u32: FnN = (x) => x >>> 0;

/**
 * Converts unsigned u8 to signed i8 value. Branchless.
 *
 * @param x
 */
export const u8i8: FnN = (x) => ((x &= 0xff), x - ((x >> 7) << 8));

/**
 * Converts unsigned u16 to signed i16 value. Branchless.
 *
 * @param x
 */
export const u16i16: FnN = (x) => ((x &= 0xffff), x - ((x >> 15) << 16));

/**
 * Converts unsigned u24 to signed i24 value. Branchless.
 *
 * @param x
 */
export const u24i24: FnN = (x) => ((x &= 0xffffff), x - ((x >> 23) << 24));

/**
 * Converts unsigned u32 to signed i32 value.
 *
 * @param x
 */
export const u32i32: FnN = (x) => x | 0;
