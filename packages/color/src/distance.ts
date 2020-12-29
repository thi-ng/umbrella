import { cossin, TAU } from "@thi.ng/math";
import type { ColorDistance } from "./api";
import { luminanceRGB } from "./luminance-rgb";

/**
 * Computes distance between two HSV colors, i.e. the eucledian distance between
 * points in a cyclinder.
 *
 * @param a
 * @param b
 */
export const distHSV: ColorDistance = (a, b) => {
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
export const distSatHSV: ColorDistance = (a, b) => Math.abs(a[1] - b[1]);

/**
 * Computes difference in brightness between two HSV or two HSL colors.
 *
 * @param a
 * @param b
 */
export const distLumaHSV: ColorDistance = (a, b) => Math.abs(a[2] - b[2]);

/**
 * Computes eucledian distance between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distRGB: ColorDistance = (a, b) =>
    Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/**
 * Computes difference in luminance between two RGB colors.
 *
 * @param a
 * @param b
 */
export const distLumaRGB: ColorDistance = (a, b) =>
    Math.abs(luminanceRGB(a) - luminanceRGB(b));
