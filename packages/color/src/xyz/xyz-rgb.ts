import type { Color, ColorOp, ReadonlyColor } from "../api";
import { XYZ_RGB_D50, XYZ_RGB_D65 } from "../api/constants";
import { mulV33 } from "../internal/matrix-ops";

/**
 * Converts CIE XYZ to RGB using provided transformation/whitepoint matrix
 * (default: {@link XYZ_RGB_D50}).
 *
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @param out - result
 * @param src - source color
 */
export const xyzRgb = (
    out: Color | null,
    src: ReadonlyColor,
    mat = XYZ_RGB_D50
) => mulV33(out, mat, src);

/**
 * Same as {@link xyzRgb}, but hard coded to use {@link D65} white point (via
 * {@link XYZ_RGB_D65} matrix).
 *
 * @param out
 * @param src
 */
export const xyzRgbD65: ColorOp = (out, src) => xyzRgb(out, src, XYZ_RGB_D65);
