import { setC4 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api.js";
import { __ensureAlpha } from "../internal/ensure.js";
import { linearSrgb } from "../linear.js";

/**
 * Converts linear RGB to sRGB.
 *
 * @param out - result
 * @param src - source color
 */
export const rgbSrgb: ColorOp = (out, src) =>
	setC4(
		out || src,
		linearSrgb(src[0]),
		linearSrgb(src[1]),
		linearSrgb(src[2]),
		__ensureAlpha(src[3])
	);

const GAMMA = 1 / 2.2;

export const rgbSrgbApprox: ColorOp = (out, src) =>
	setC4(
		out || src,
		src[0] ** GAMMA,
		src[1] ** GAMMA,
		src[2] ** GAMMA,
		__ensureAlpha(src[3])
	);
