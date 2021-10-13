import { clamp01 } from "@thi.ng/math/interval";
import { setC3 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api.js";
import { __ensureAlpha } from "../internal/ensure.js";
import { luminanceRgb } from "../luminance-rgb.js";
import { hueRgb } from "../rgb/hue-rgb.js";

export const hcyRgb: ColorOp = (out, src) => {
    const h = src[0];
    let c = src[1];
    const y = src[2];
    const rgb = hueRgb(out || src, h, __ensureAlpha(src[3]));
    const lum = luminanceRgb(rgb);
    if (y < lum) {
        c *= y / lum;
    } else if (lum < 1) {
        c *= (1 - y) / (1 - lum);
    }
    return setC3(
        rgb,
        clamp01((rgb[0] - lum) * c + y),
        clamp01((rgb[1] - lum) * c + y),
        clamp01((rgb[2] - lum) * c + y)
    );
};
