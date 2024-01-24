import type { Fn3, Fn4, FnN, FnU3 } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";

/** @internal */
const analogU = (x: number, delta: number, rnd: IRandom) =>
	delta !== 0 ? x + rnd.norm(delta) : x;

/** @internal */
const analogN = (x: number, delta: number, rnd: IRandom, post: FnN = clamp01) =>
	delta !== 0 ? post(x + rnd.norm(delta)) : x;

/** @internal */
const analogH = (x: number, delta: number, rnd: IRandom) =>
	analogN(x, delta, rnd, fract);

/** @internal */
const analogA = (a: number, delta: number, rnd: IRandom) =>
	delta !== 0
		? clamp01((a !== undefined ? a : 1) + rnd.norm(delta))
		: __ensureAlpha(a);

export const defAnalog: FnU3<
	Fn3<number, number, IRandom, number>,
	Fn4<Color | null, TypedColor<any>, number, IRandom | undefined, Color>
> =
	(x, y, z) =>
	(out, src, delta, rnd = SYSTEM) =>
		setC4(
			out || src,
			x(src[0], delta, rnd),
			y(src[1], delta, rnd),
			z(src[2], delta, rnd),
			__ensureAlpha(src[3])
		);

/** @internal */
const analogHNN = defAnalog(analogH, analogN, analogN);

/** @internal */
const analogNNN = defAnalog(analogN, analogN, analogN);

/** @internal */
const analogNUU = defAnalog(analogN, analogU, analogU);

/**
 * Returns a random analog color based on given `src` color and variance
 * `delta`. Each channel will be randomized by +/- `delta`, optionally using
 * provided
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
 * PRNG.
 *
 * @remarks
 * If `out` is null, the resulting color will be written back into `src`.
 *
 */
export const analog = defmulti<
	Color | null,
	TypedColor<any>,
	number,
	IRandom | undefined,
	Color
>(
	__dispatch1,
	{ oklab: "lab50", oklch: "lch" },
	{
		hcy: analogHNN,
		hsi: analogHNN,
		hsl: analogHNN,
		hsv: analogHNN,
		lab50: analogNUU,
		lab65: analogNUU,
		lch: defAnalog(analogN, analogN, analogH),
		ycc: analogNUU,
		[DEFAULT]: analogNNN,
	}
);

/**
 * Similar to {@link analogRgb}. Returns an analog color based on given HSVA
 * color, with each channel randomly varied by given channel-specific delta
 * amounts (and optionally given
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
 * PRNG).
 *
 * @remarks
 * This function provides more user control than {@link analog}, but the latter
 * is recommended for most use cases.
 *
 * By default (unless `deltaS`, `deltaV`, `deltaA` are provided) only the hue of
 * the color will be modulated.
 *
 * @param out -
 * @param src -
 * @param deltaH -
 * @param deltaS -
 * @param deltaV -
 * @param deltaA -
 * @param rnd -
 */
export const analogHsv = (
	out: Color | null,
	src: ReadonlyColor,
	deltaH: number,
	deltaS = 0,
	deltaV = 0,
	deltaA = 0,
	rnd: IRandom = SYSTEM
) =>
	setC4(
		out || src,
		analogN(src[0], deltaH, rnd, fract),
		analogN(src[1], deltaS, rnd),
		analogN(src[2], deltaV, rnd),
		analogA(src[3], deltaA, rnd)
	);

/**
 * Similar to {@link analogHsv}. Returns an analog color based on given RGBA
 * color, with each channel randomly varied by given delta amounts (and
 * optionally given
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
 * PRNG).
 *
 * @remarks
 * By default the green and blue channel variance will be the same as `deltaR`.
 *
 * @param out -
 * @param src -
 * @param deltaR -
 * @param deltaG -
 * @param deltaB -
 * @param deltaA -
 * @param rnd -
 */
export const analogRgb = (
	out: Color | null,
	src: ReadonlyColor,
	deltaR: number,
	deltaG = deltaR,
	deltaB = deltaR,
	deltaA = 0,
	rnd: IRandom = SYSTEM
) =>
	setC4(
		out || src,
		analogN(src[0], deltaR, rnd),
		analogN(src[1], deltaG, rnd),
		analogN(src[2], deltaB, rnd),
		analogA(src[3], deltaA, rnd)
	);
