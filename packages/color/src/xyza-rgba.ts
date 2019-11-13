import { ColorOp, XYZ_RGB } from "./api";
import { mulV33 } from "./internal/matrix-ops";

/**
 * https://en.wikipedia.org/wiki/CIE_1931_color_space
 *
 * @param out -
 * @param src -
 */
export const xyzaRgba: ColorOp = (out, src) => mulV33(out || src, XYZ_RGB, src);
