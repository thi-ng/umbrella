import { EPS } from "@thi.ng/math";
import type { ColorOp } from "./api";
import { hueRgba } from "./hue-rgba";
import { luminanceRGB } from "./luminance-rgb";
import { rgbaHcva } from "./rgba-hcva";

/**
 * Ported from:
 * {@link https://github.com/tobspr/GLSL-Color-Spaces/blob/develop/ColorSpaces.inc.glsl#L226}
 *
 * @param out - result
 * @param src - source color
 */
export const rgbaHcya: ColorOp = (out, src) => {
    const y = luminanceRGB(src);
    out = rgbaHcva(out, src);
    const z = luminanceRGB(hueRgba([], out[0]));
    out[1] *= y < z ? z / (y + EPS) : (1 - z) / (1 + EPS - y);
    out[2] = y;
    return out;
};
