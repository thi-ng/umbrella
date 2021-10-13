import { EPS } from "@thi.ng/math/api";
import type { ColorOp } from "../api.js";
import { luminanceRgb } from "../luminance-rgb.js";
import { hueRgb } from "./hue-rgb.js";
import { rgbHcv } from "./rgb-hcv.js";

/**
 * Ported from:
 * {@link https://github.com/tobspr/GLSL-Color-Spaces/blob/develop/ColorSpaces.inc.glsl#L226}
 *
 * @param out - result
 * @param src - source color
 */
export const rgbHcy: ColorOp = (out, src) => {
    const y = luminanceRgb(src);
    out = rgbHcv(out, src);
    const z = luminanceRgb(hueRgb([], out[0]));
    out[1] *= y < z ? z / (y + EPS) : (1 - z) / (1 + EPS - y);
    out[2] = y;
    return out;
};
