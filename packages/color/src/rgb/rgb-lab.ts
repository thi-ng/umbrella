import type { ColorOp } from "../api";
import { rgbXyz, rgbXyzD65 } from "./rgb-xyz";
import { xyzLab, xyzLabD65 } from "../xyz/xyz-lab";

/**
 * Converts linear RGB to Lab (via XYZ) using {@link D50} white point.
 *
 * @remarks
 * Important: We're using a normalized Lab space w/ all three coordinates
 * divided by 100 (normalized to 100% luminance).
 *
 * @param out
 * @param src
 */
export const rgbLab: ColorOp = (out, src) => xyzLab(null, rgbXyz(out, src));

/**
 * Same as {@link rgbLab}, but using {@link D65} white point.
 *
 * @param out
 * @param src
 */
export const rgbLabD65: ColorOp = (out, src) =>
    xyzLabD65(null, rgbXyzD65(out, src));
