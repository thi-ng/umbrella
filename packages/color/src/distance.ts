import { cossin, TAU } from "@thi.ng/math";
import type { ColorDistance } from "./api";
import { luminanceRgb, luminanceSrgb } from "./luminance-rgb";

/**
 * Higher order function. Returns {@link ColorDistance} function for given color
 * channel ID.
 *
 * @param id
 */
export const distChannel = (id: number): ColorDistance => (a, b) =>
    Math.abs(a[id] - b[id]);

/**
 * Computes distance between two HSV colors, i.e. the eucledian distance between
 * points in a cyclinder.
 *
 * @param a
 * @param b
 */
export const distHsv: ColorDistance = (a, b) => {
    const aa = cossin(a[0] * TAU, a[1]);
    const bb = cossin(b[0] * TAU, b[1]);
    return Math.hypot(aa[0] - bb[0], aa[1] - bb[1], a[2] - b[2]);
};

/**
 * Computes difference in saturation between two HSV colors.
 *
 * @param a
 * @param b
 */
export const distHsvSat = distChannel(1);

/**
 * Computes difference in brightness between two HSV or two HSL colors.
 *
 * @param a
 * @param b
 */
export const distHsvLuma = distChannel(2);

/**
 * Computes eucledian distance between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distRgb: ColorDistance = (a, b) =>
    Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/**
 * Computes difference in luminance between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distRgbLuma: ColorDistance = (a, b) =>
    Math.abs(luminanceRgb(a) - luminanceRgb(b));

export const distSrgbLuma: ColorDistance = (a, b) =>
    Math.abs(luminanceSrgb(a) - luminanceSrgb(b));

/**
 * Computes red difference between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distRgbRed = distChannel(0);

/**
 * Computes green difference between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distRgbGreen = distChannel(1);

/**
 * Computes blue difference between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distRgbBlue = distChannel(1);
