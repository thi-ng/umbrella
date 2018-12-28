import { SRGB_ALPHA, ReadonlyColor, Color } from "./api";
import { setC4 } from "@thi.ng/vectors3/setc";
import { ensureAlpha } from "./internal/ensure-alpha";

/**
 * Maps a single linear RGB channel value to sRGB.
 *
 * https://en.wikipedia.org/wiki/SRGB
 *
 * @param x
 */
export const linearSrgb =
    (x: number) =>
        x <= 0.0031308 ?
            12.92 * x :
            (1.0 + SRGB_ALPHA) * Math.pow(x, 1.0 / 2.4) - SRGB_ALPHA;

/**
 * Maps a single linear sRGB channel value to linear RGB.
 *
 * https://en.wikipedia.org/wiki/SRGB
 *
 * @param x
 */
export const srgbLinear =
    (x: number) =>
        x <= 0.04045 ?
            x / 12.92 :
            Math.pow((x + SRGB_ALPHA) / (1 + SRGB_ALPHA), 2.4);

/**
 * Converts linear RGB to sRGB.
 *
 * @param out
 * @param src
 */
export const rgbaSrgba =
    (out: Color, src: ReadonlyColor) =>
        setC4(
            out || src,
            linearSrgb(src[0]),
            linearSrgb(src[1]),
            linearSrgb(src[2]),
            ensureAlpha(src[3])
        );

/**
 * Converts sRGB to linear RGB.
 *
 * @param out
 * @param src
 */
export const srgbaRgba =
    (out: Color, src: ReadonlyColor) =>
        setC4(
            out || src,
            srgbLinear(src[0]),
            srgbLinear(src[1]),
            srgbLinear(src[2]),
            ensureAlpha(src[3])
        );
