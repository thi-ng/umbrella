import type { FnN3, FnU4 } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { mix as $mix } from "@thi.ng/math/mix";
import { fract } from "@thi.ng/math/prec";
import { mixN4 } from "@thi.ng/vectors/mixn";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ColorMixFn, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";

/**
 * HOF color mix function. Takes 4 scalar mix fns (one per color channel) and
 * returns new {@link ColorMixFn}.
 *
 * @param x -
 * @param y -
 * @param z -
 * @param alpha -
 */
export const defMix: FnU4<FnN3, ColorMixFn> =
	(x, y, z, alpha) => (out, a, b, t) =>
		setC4(
			out || a,
			x(a[0], b[0], t),
			y(a[1], b[1], t),
			z(a[2], b[2], t),
			alpha(a[3], b[3], t)
		);

/**
 * Single channel interpolation for (normalized) hues. Always interpolates via
 * smallest angle difference, i.e. such that the effective `abs(a-b) <= 0.5`.
 *
 * @param a - start hue in [0,1) interval
 * @param b - end hue in [0,1) interval
 * @param t - interpolation factor
 */
export const mixH: FnN3 = (a, b, t) => {
	a = fract(a);
	b = fract(b);
	const delta = b - a;
	return fract(
		a +
			(Math.abs(delta) > 0.5
				? delta < 0
					? delta + 1
					: -(1 - delta)
				: delta) *
				t
	);
};

/**
 * Single channel linear interpolation function.
 *
 * @param a -
 * @param b -
 * @param t -
 */
export const mixN = $mix;

export const mixHNNN = defMix(mixH, mixN, mixN, mixN);

export const mixNNHN = defMix(mixN, mixN, mixH, mixN);

/**
 * Channelwise linear interpolation between colors `a` and `b` using `t` [0..1]
 * as blend factor.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param t -
 */
export const mixNNNN: ColorMixFn = mixN4;

/**
 * Channelwise and {@link ColorMode}-aware interpolation between colors `a` and
 * `b` using `t` [0..1] as blend factor. `a` and `b` MUST be of same color
 * type.
 *
 * @remarks
 * If `out` is null, the resulting color will be written back into `a`.
 *
 * Any hue channel will always be interpolated using the smallest angle
 * difference (using {@link mixH}).
 *
 * The [thi.ng/math](https://thi.ng/thi.ng/math) package provides various easing
 * functions to create non-linear interpolations. For example:
 *
 * @example
 * ```ts tangle:../export/mix.ts
 * import { mix, rgb, RED, GREEN } from "@thi.ng/color";
 * import { circular } from "@thi.ng/math";
 *
 * console.log(
 *   mix([], rgb("#f00"), rgb("#0f0"), 0.5)
 * );
 * // [ 0.5, 0.5, 0, 1 ]
 *
 * console.log(
 *   mix([], rgb(RED), rgb(GREEN), circular(0.5))
 * );
 * // [ 0.1339745962155614, 0.8660254037844386, 0, 1 ]
 * ```
 *
 * @param out -
 * @param a -
 * @param b -
 * @param t -
 */
export const mix = defmulti<
	Color | null,
	TypedColor<any>,
	TypedColor<any>,
	number,
	Color
>(
	__dispatch1,
	{},
	{
		hcy: mixHNNN,
		hsi: mixHNNN,
		hsl: mixHNNN,
		hsv: mixHNNN,
		lch: mixNNHN,
		[DEFAULT]: mixN4,
	}
);
