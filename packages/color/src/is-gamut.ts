import { inRange } from "@thi.ng/math/interval";
import type { TypedColor } from "./api.js";
import { rgb } from "./rgb/rgb.js";

/**
 * Returns true, if given color is within the RGB gamut (without clipping).
 *
 * @param src
 * @param eps
 */
export const isRgbGamut = (src: TypedColor<any>, eps = 1e-3) => {
    const min = -eps;
    const max = 1 + eps;
    const col = src.mode === "rgb" || src.mode === "srgb" ? src : rgb(src);
    return (
        inRange(col[0], min, max) &&
        inRange(col[1], min, max) &&
        inRange(col[2], min, max)
    );
};
