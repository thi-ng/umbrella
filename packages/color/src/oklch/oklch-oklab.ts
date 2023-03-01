import { cossin } from "@thi.ng/math/angle";
import { TAU } from "@thi.ng/math/api";
import { setC4 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api.js";
import { __ensureAlpha } from "../internal/ensure.js";

/**
 * @remarks
 * Reference:
 * - https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
 *
 * @param out
 * @param src
 */
export const oklchOklab: ColorOp = (out, src) =>
	setC4(
		out || src,
		src[0],
		...cossin(src[2] * TAU, src[1]),
		__ensureAlpha(src[3])
	);
