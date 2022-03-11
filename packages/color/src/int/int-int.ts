import { swapLane13 } from "@thi.ng/binary/swizzle";

/**
 * Convert ARGB int to ABGR and vice versa.
 *
 * @param x - 
 */
export const intArgb32Abgr32 = swapLane13;

/**
 * Alias for {@link intArgbAbgr}.
 */
export const intAbgr32Argb32 = swapLane13;
