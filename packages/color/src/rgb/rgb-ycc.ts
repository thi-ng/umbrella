import { dot3, setC4 } from "@thi.ng/vectors";
import type { Color, ReadonlyColor } from "../api";
import { LINEAR_RGB_LUMINANCE } from "../api/constants";
import { ensureAlpha } from "../internal/ensure-alpha";

/**
 * @remarks
 * https://en.wikipedia.org/wiki/YCbCr#YCbCr
 *
 * By default uses luminance weights as per BT.709 (aka
 * {@link LINEAR_RGB_LUMINANCE}):
 *
 * - https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.709_conversion
 * - https://en.wikipedia.org/wiki/Rec._709
 *
 * @param out
 * @param src
 * @param luma
 */
export const rgbYcc = (
    out: Color | null,
    src: ReadonlyColor,
    luma = LINEAR_RGB_LUMINANCE
) => {
    const y = dot3(src, luma);
    return setC4(
        out || src,
        y,
        (0.5 * (src[2] - y)) / (1 - luma[2]),
        (0.5 * (src[0] - y)) / (1 - luma[0]),
        ensureAlpha(src[3])
    );
    // return setC3(out||src, y, (src[2] - y) * 0.565, (src[0] - y) * 0.713);
};
