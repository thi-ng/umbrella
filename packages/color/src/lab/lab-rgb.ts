import type { ColorOp } from "../api.js";
import { labXyz, labXyzD65 } from "./lab-xyz.js";
import { xyzRgb, xyzRgbD65 } from "../xyz/xyz-rgb.js";

/**
 * Converts Lab to linear RGB (via XYZ) using {@link D50} white point.
 *
 * @param out -
 * @param src -
 */
export const labRgb: ColorOp = (out, src) => xyzRgb(null, labXyz(out, src));

/**
 * Same as {@link labRgb}, but using {@link D65} white point.
 *
 * @param out -
 * @param src -
 */
export const labRgbD65: ColorOp = (out, src) =>
	xyzRgbD65(null, labXyzD65(out, src));
