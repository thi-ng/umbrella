import type { MultiFn3O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { mix } from "@thi.ng/math/mix";
import { setC4 } from "@thi.ng/vectors";
import type { Color, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";

/**
 * Creates a tinted version of given `src` color and writes result into `out`.
 * The color is interpolated towards given `target` grayscale level (default: 1
 * aka white).
 *
 * @remarks
 * Reference: https://www.handprint.com/HP/WCL/color3.html#stt
 *
 * If `out` is null, the resulting color will be written back into `src`.
 *
 * Only supported for the following color modes:
 *
 * - hcy
 * - hsi
 * - hsv
 * - lch
 * - oklch
 *
 * @param out
 * @param src
 * @param amount
 * @param target
 */
export const tint: MultiFn3O<
	Color | null,
	TypedColor<any>,
	number,
	number,
	Color
> = defmulti<Color | null, TypedColor<any>, number, number | undefined, Color>(
	__dispatch1,
	{ hcy: "hsv", hsi: "hsv", hsl: "hsv", oklch: "lch" },
	{
		hsv: (out, src, n, l = 1) =>
			setC4(
				out || src,
				src[0],
				src[1] * (1 - n),
				mix(src[2], l, n),
				__ensureAlpha(src[3])
			),
		lch: (out, src, n, l = 1) =>
			setC4(
				out || src,
				mix(src[0], l, n),
				src[1] * (1 - n),
				src[2],
				__ensureAlpha(src[3])
			),
	}
);

/**
 * Version of {@link tint} with medium gray as target.
 *
 * @remarks
 * Reference: https://www.handprint.com/HP/WCL/color3.html#stt
 *
 * If `out` is null, the resulting color will be written back into `src`.
 *
 * @param out
 * @param src
 * @param n
 */
export const tone = (out: Color | null, src: TypedColor<any>, n: number) =>
	tint(out, src, n, 0.5);

/**
 * Version of {@link tint} with black as target.
 *
 * @remarks
 * Reference: https://www.handprint.com/HP/WCL/color3.html#stt
 *
 * If `out` is null, the resulting color will be written back into `src`.
 *
 * @param out
 * @param src
 * @param n
 */
export const shade = (out: Color | null, src: TypedColor<any>, n: number) =>
	tint(out, src, n, 0);
