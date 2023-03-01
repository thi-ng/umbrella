import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor } from "./api.js";

export const alpha = (src: ReadonlyColor) =>
	src[3] !== undefined ? src[3] : 1;

/**
 * Creates version of `src` color with modified `alpha` and writes result into
 * `out` (or if null, back into `src`).
 *
 * @param out
 * @param src
 * @param alpha
 */
export const setAlpha = (
	out: Color | null,
	src: ReadonlyColor,
	alpha: number
) => setC4(out || src, src[0], src[1], src[2], alpha);
