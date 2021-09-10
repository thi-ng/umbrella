import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor } from "../api";
import { RGB_LUMINANCE_REC709 } from "../api/constants";
import { ensureAlpha } from "../internal/ensure-alpha";

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
 * @param out
 * @param src
 * @param luma
 */
export const yccRgb = (
    out: Color | null,
    src: ReadonlyColor,
    luma = RGB_LUMINANCE_REC709
) => {
    const y = src[0];
    const bb = (2 - 2 * luma[2]) * src[1];
    const rr = (2 - 2 * luma[0]) * src[2];
    return setC4(
        out || src,
        y + rr,
        y - (luma[2] / luma[1]) * bb - (luma[0] / luma[1]) * rr,
        y + bb,
        ensureAlpha(src[3])
    );
};
