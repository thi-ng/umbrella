import type { ColorOp } from "./api";
import { XYZ_RGB } from "./constants";
import { mulV33 } from "./internal/matrix-ops";

/**
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @param out - result
 * @param src - source color
 */
export const xyzRgb: ColorOp = (out, src) => mulV33(out || src, XYZ_RGB, src);
