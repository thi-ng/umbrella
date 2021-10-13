import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ColorOp, ReadonlyColor } from "../api.js";
import { D50, D65 } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";

const transform = (x: number) => {
    const y = x ** 3;
    return y > 0.008856 ? y : (x - 16 / 116) / 7.787;
};

/**
 * Converts Lab to XYZ using provided white point (default: {@link D50}). Also
 * see {@link labXyzD65}.
 *
 * @param out
 * @param src
 * @param white
 */
export const labXyz = (out: Color | null, src: ReadonlyColor, white = D50) => {
    const y = (src[0] + 0.16) / 1.16;
    return setC4(
        out || src,
        transform(src[1] / 5.0 + y) * white[0],
        transform(y) * white[1],
        transform(y - src[2] / 2.0) * white[2],
        __ensureAlpha(src[3])
    );
};

/**
 * Same as {@link labXyz}, but using hardcoded {@link D65} white point.
 *
 * @param out
 * @param src
 */
export const labXyzD65: ColorOp = (out, src) => labXyz(out, src, D65);
