import { defmulti } from "@thi.ng/defmulti/defmulti";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";

/**
 * Color rotation. Rotates hue by given `theta` and writes result color into
 * `out`.
 *
 * @remarks
 * If `out` is null, the resulting will be written back into `src`.
 *
 * As with all hue-based color modes in this package, the hue is stored
 * normalized (in [0..1] interval) and NOT as degrees. The same goes for the
 * rotation angle `theta`.
 *
 * Only supported for hue based color modes:
 *
 * - hcy
 * - hsi
 * - hsl
 * - hsv
 * - lch
 * - oklch
 *
 * @param out
 * @param src
 * @param theta
 */
export const rotate = defmulti<Color | null, TypedColor<any>, number, Color>(
	__dispatch1,
	{ hcy: "hsl", hsi: "hsl", hsv: "hsl", oklch: "lch" },
	{
		hsl: (out, src, theta) =>
			setC4(
				out || src,
				fract(src[0] + theta),
				src[1],
				src[2],
				__ensureAlpha(src[3])
			),
		lch: (out, src, theta) =>
			setC4(
				out || src,
				src[0],
				src[1],
				fract(src[2] + theta),
				__ensureAlpha(src[3])
			),
	}
);

/**
 * Syntax sugar for {@link rotate} with 180 degree rotation.
 *
 * @remarks
 * If `out` is null, the resulting color will be written back into `src`.
 *
 * @param out
 * @param src
 */
export const complementary = (out: Color | null, src: TypedColor<any>) =>
	rotate(out, src, 0.5);
