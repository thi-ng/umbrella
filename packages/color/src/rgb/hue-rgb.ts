import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, Hue } from "../api.js";

/**
 * Converts a normalized hue to RGBA with given optional `alpha`
 * value (default: 1).
 *
 * @param out - result
 * @param hue - normalized hue
 */
export const hueRgb = (out: Color | null, hue: number, alpha = 1): Color => {
	hue = fract(hue) * 6;
	return setC4(
		out || [],
		clamp01(Math.abs(hue - 3) - 1),
		clamp01(2 - Math.abs(hue - 2)),
		clamp01(2 - Math.abs(hue - 4)),
		alpha
	);
};

export const namedHueRgb = (out: Color | null, hue: Hue, alpha = 1) =>
	hueRgb(out, hue / 12, alpha);
