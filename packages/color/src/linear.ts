import { SRGB_ALPHA } from "./constants";

/**
 * Maps a single linear RGB channel value to sRGB.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @param x - channel value
 */
export const linearSrgb = (x: number) =>
    x <= 0.0031308
        ? 12.92 * x
        : (1.0 + SRGB_ALPHA) * Math.pow(x, 1.0 / 2.4) - SRGB_ALPHA;

/**
 * Maps a single linear sRGB channel value to linear RGB.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @param x - channel value
 */
export const srgbLinear = (x: number) =>
    x <= 0.04045
        ? x / 12.92
        : Math.pow((x + SRGB_ALPHA) / (1 + SRGB_ALPHA), 2.4);
