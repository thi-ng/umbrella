/**
 * Maps a single linear RGB channel value to sRGB.
 *
 * https://en.wikipedia.org/wiki/SRGB
 *
 * @param x - channel value
 */
export const linearSrgb = (x: number) =>
	x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

/**
 * Maps a single linear sRGB channel value to linear RGB.
 *
 * https://en.wikipedia.org/wiki/SRGB
 *
 * @param x - channel value
 */
export const srgbLinear = (x: number) =>
	x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
