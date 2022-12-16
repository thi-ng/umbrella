import type { Color, ColorOp, ReadonlyColor } from "../api.js";
import { RGB_XYZ_D50, RGB_XYZ_D65 } from "../api/constants.js";
import { clamp } from "../clamp.js";
import { __mulV33 } from "../internal/matrix-ops.js";

/**
 * Converts RGB to XYZ using provided transformation matrix (default:
 * {@link RGB_XYZ_D50}).
 *
 * https://en.wikipedia.org/wiki/CIE_1931_color_space
 *
 * @param out - result
 * @param src - source color
 * @param mat - transform matrix
 */
export const rgbXyz = (
	out: Color | null,
	src: ReadonlyColor,
	mat = RGB_XYZ_D50
) => __mulV33(null, mat, clamp(out, src));

/**
 * Same as {@link rgbXyz}, but hard coded to use {@link D65} white point (via
 * {@link RGB_XYZ_D65} matrix).
 *
 * @param out -
 * @param src -
 */
export const rgbXyzD65: ColorOp = (out, src) => rgbXyz(out, src, RGB_XYZ_D65);
