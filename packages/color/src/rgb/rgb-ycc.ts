import { dot3 } from "@thi.ng/vectors/dot";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor } from "../api.js";
import { RGB_LUMINANCE_REC709 } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";

/**
 * @remarks
 * https://en.wikipedia.org/wiki/YCbCr#YCbCr
 *
 * By default uses luminance weights as per BT.709 (aka
 * {@link RGB_LUMINANCE_REC709}):
 *
 * - https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.709_conversion
 * - https://en.wikipedia.org/wiki/Rec._709
 *
 * @param out - 
 * @param src - 
 * @param luma - 
 */
export const rgbYcc = (
    out: Color | null,
    src: ReadonlyColor,
    luma = RGB_LUMINANCE_REC709
) => {
    const y = dot3(src, luma);
    return setC4(
        out || src,
        y,
        (0.5 * (src[2] - y)) / (1 - luma[2]),
        (0.5 * (src[0] - y)) / (1 - luma[0]),
        __ensureAlpha(src[3])
    );
};
