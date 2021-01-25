import type { ColorOp } from "./api";
import { clamp } from "./clamp";
import { RGB_XYZ } from "./constants";
import { ensureAlpha } from "./internal/ensure-alpha";
import { mulV33 } from "./internal/matrix-ops";

/**
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @param out - result
 * @param src - source color
 */
export const rgbXyz: ColorOp = (out, src) => {
    out = mulV33(null, RGB_XYZ, clamp(out || src, src), false);
    out[3] = ensureAlpha(src[3]);
    return out;
};
