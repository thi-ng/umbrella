import { atan2Abs } from "@thi.ng/math/angle";
import { INV_TAU } from "@thi.ng/math/api";
import { setC4 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api.js";
import { __ensureAlpha } from "../internal/ensure.js";

export const oklabOklch: ColorOp = (out, src) =>
	setC4(
		out || src,
		src[0],
		Math.hypot(src[1], src[2]),
		atan2Abs(src[2], src[1]) * INV_TAU,
		__ensureAlpha(src[3])
	);

/*
export function OKLab_to_OKLCH(OKLab: Color): Color {
	const hue = Math.atan2(OKLab[2], OKLab[1]) * 180 / Math.PI;
	return [
		OKLab[0], // L is still L
		Math.sqrt(OKLab[1] ** 2 + OKLab[2] ** 2), // Chroma
		hue >= 0 ? hue : hue + 360, // Hue, in degrees [0 to 360)
	];
}
*/
