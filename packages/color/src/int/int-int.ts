/**
 * Convert ARGB int to ABGR and vice versa.
 *
 * @param x
 */
export const intArgb32Abgr32 = (x: number) =>
    ((x & 0xff) << 16) | ((x >> 16) & 0xff) | (x & 0xff00ff00);

/**
 * Same as {@link intArgbAbgr}.
 */
export const intAbgr32Argb32 = intArgb32Abgr32;
