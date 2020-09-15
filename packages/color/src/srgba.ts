import { setC4 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { SRGB_ALPHA } from "./constants";
import { ensureAlpha } from "./internal/ensure-alpha";

/**
 * Maps a single linear RGB channel value to sRGB.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @param x - channel value
 */
export const linearSrgb = (x: number) =>
    x <= 0.0031308
        ? 12.92 * x
        : (1.0 + SRGB_ALPHA) * Math.pow(x, 1.0 / 2.4) - SRGB_ALPHA;

/**
 * Maps a single linear sRGB channel value to linear RGB.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @param x - channel value
 */
export const srgbLinear = (x: number) =>
    x <= 0.04045
        ? x / 12.92
        : Math.pow((x + SRGB_ALPHA) / (1 + SRGB_ALPHA), 2.4);

/**
 * Converts linear RGB to sRGB.
 *
 * @param out - result
 * @param src - source color
 */
export const rgbaSrgba: ColorOp = (out, src) =>
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
 * @param out - result
 * @param src - source color
 */
export const srgbaRgba: ColorOp = (out, src) =>
    setC4(
        out || src,
        srgbLinear(src[0]),
        srgbLinear(src[1]),
        srgbLinear(src[2]),
        ensureAlpha(src[3])
    );
