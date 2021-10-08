import { dot3 } from "@thi.ng/vectors/dot";
import type { ReadonlyColor } from "./api";
import { RGB_LUMINANCE_REC709, RGB_LUMINANCE_REC601 } from "./api/constants";

/**
 * Computes RGB luminance, optionally using provided weights (by default:
 * {@link RGB_LUMINANCE_REC709}).
 *
 * @param rgb
 * @param weights
 */
export const luminanceRgb = (
    rgb: ReadonlyColor,
    weights = RGB_LUMINANCE_REC709
) => dot3(rgb, weights);

/**
 * Similar to {@link luminanceRgb}, but uses {@link RGB_LUMINANCE_REC601} coeffs
 */
export const luminanceSrgb = (rgb: ReadonlyColor) =>
    dot3(rgb, RGB_LUMINANCE_REC601);

export const luminanceIntArgb32 = (rgb: number) =>
    (((rgb >>> 16) & 0xff) * 76 +
        ((rgb >>> 8) & 0xff) * 150 +
        (rgb & 0xff) * 29) /
    0xfe01;

export const luminanceIntAbgr32 = (rgb: number) =>
    (((rgb >>> 16) & 0xff) * 29 +
        ((rgb >>> 8) & 0xff) * 150 +
        (rgb & 0xff) * 76) /
    0xfe01;

export const luminanceArgb32 = (argb: ReadonlyColor) =>
    luminanceIntArgb32(argb[0]);

export const luminanceAbgr32 = (argb: ReadonlyColor) =>
    luminanceIntAbgr32(argb[0]);
