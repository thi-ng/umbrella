// SPDX-License-Identifier: Apache-2.0
import type { Fn3, FnN, FnU3, Maybe } from "@thi.ng/api";
import type { MultiFn3O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";

export type AnalogFn = {
	(
		out: Color | null,
		src: TypedColor<any>,
		delta: number,
		rnd?: IRandom
	): Color;
} & MultiFn3O<Color | null, TypedColor<any>, number, IRandom, Color>;

/** @internal */
const __analogU = (x: number, delta: number, rnd: IRandom) =>
	delta !== 0 ? x + rnd.norm(delta) : x;

/** @internal */
const __analogN = (
	x: number,
	delta: number,
	rnd: IRandom,
	post: FnN = clamp01
) => (delta !== 0 ? post(x + rnd.norm(delta)) : x);

/** @internal */
const __analogH = (x: number, delta: number, rnd: IRandom) =>
	__analogN(x, delta, rnd, fract);

/** @internal */
const __analogA = (a: number, delta: number, rnd: IRandom) =>
	delta !== 0
		? clamp01((a !== undefined ? a : 1) + rnd.norm(delta))
		: __ensureAlpha(a);

export const defAnalog: FnU3<
	Fn3<number, number, IRandom, number>,
	(
		out: Color | null,
		src: TypedColor<any>,
		delta: number,
		rnd?: IRandom
	) => Color
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
const __analogHNN = defAnalog(__analogH, __analogN, __analogN);

/** @internal */
const __analogNNN = defAnalog(__analogN, __analogN, __analogN);

/** @internal */
const __analogNUU = defAnalog(__analogN, __analogU, __analogU);

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
export const analog: AnalogFn = defmulti<
	Color | null,
	TypedColor<any>,
	number,
	Maybe<IRandom>,
	Color
>(
	__dispatch1,
	{ oklab: "lab50", oklch: "lch" },
	{
		hcy: __analogHNN,
		hsi: __analogHNN,
		hsl: __analogHNN,
		hsv: __analogHNN,
		lab50: __analogNUU,
		lab65: __analogNUU,
		lch: defAnalog(__analogN, __analogN, __analogH),
		ycc: __analogNUU,
		[DEFAULT]: __analogNNN,
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
		__analogN(src[0], deltaH, rnd, fract),
		__analogN(src[1], deltaS, rnd),
		__analogN(src[2], deltaV, rnd),
		__analogA(src[3], deltaA, rnd)
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
		__analogN(src[0], deltaR, rnd),
		__analogN(src[1], deltaG, rnd),
		__analogN(src[2], deltaB, rnd),
		__analogA(src[3], deltaA, rnd)
	);
