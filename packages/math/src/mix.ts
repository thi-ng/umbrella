// SPDX-License-Identifier: Apache-2.0
import type { FnN, FnN2, FnN3, FnN4, FnN5, FnN6 } from "@thi.ng/api";
import { EPS, HALF_PI, PI } from "./api.js";

/**
 * Linear interpolation without clamping. Computes `a + (b - a) * t`
 *
 * @param a - start value
 * @param b - end value
 * @param t - interpolation factor `[0,1]`
 */
export const mix: FnN3 = (a, b, t) => a + (b - a) * t;

/**
 * Bilinear interpolation of given values (`a`,`b`,`c`,`d`).
 *
 * @example
 * ```text
 * c    d
 * +----+
 * |    |
 * +----+
 * a    b
 * ```
 *
 * @param a - BL value
 * @param b - BR value
 * @param c - TL value
 * @param d - TR value
 * @param u - 1st interpolation factor
 * @param v - 2nd interpolation factor
 */
export const mixBilinear: FnN6 = (a, b, c, d, u, v) => {
	const iu = 1 - u;
	const iv = 1 - v;
	return a * iu * iv + b * u * iv + c * iu * v + d * u * v;
};

/**
 * Trilinear interpolation of given values (`a`..`h`) with interpolation factors
 * `u`,`v`,`w` (in `[0,1]` range).
 *
 * @example
 * ```text
 * c +-------+ d
 *   |\      :\
 *   | \     : \
 *   |g +-------+ h
 *   |  |    :  |
 * a +··|····+ b|
 *    \ |     \ |
 *     \|      \|
 *    e +-------+ f
 * ```
 *
 * @param a
 * @param b
 * @param c
 * @param d
 * @param e
 * @param f
 * @param g
 * @param h
 * @param u
 * @param v
 * @param w
 */
export const mixTrilinear = (
	a: number,
	b: number,
	c: number,
	d: number,
	e: number,
	f: number,
	g: number,
	h: number,
	u: number,
	v: number,
	w: number
) => {
	const iu = 1 - u;
	const iv = 1 - v;
	const iw = 1 - w;
	const uv = u * v;
	const u_iv = u * iv;
	const iu_v = iu * v;
	const iuv = iu * iv;
	return (
		a * iuv * iw +
		b * u_iv * iw +
		c * iu_v * iw +
		d * uv * iw +
		e * iuv * w +
		f * u_iv * w +
		g * iu_v * w +
		h * uv * w
	);
};

/**
 * Computes quadratic bezier interpolation for normalized value `t`.
 * Interpolated result is between end points `a` and `c` with `b` a control
 * point.
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/s3cvphot1o)
 *
 * @param a
 * @param b
 * @param c
 * @param t
 */
export const mixQuadratic: FnN4 = (a, b, c, t) => {
	const s = 1 - t;
	return a * s * s + b * 2 * s * t + c * t * t;
};

/**
 * Computes cubic bezier interpolation for normalized value `t`. Interpolated
 * result is between end points `a` and `d` with `b` and `c` control points.
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/dfc6twzlmk)
 *
 * @param a
 * @param b
 * @param c
 * @param d
 * @param t
 */
export const mixCubic: FnN5 = (a, b, c, d, t) => {
	const t2 = t * t;
	const s = 1 - t;
	const s2 = s * s;
	return a * s2 * s + b * 3 * s2 * t + c * 3 * t2 * s + d * t2 * t;
};

/**
 * Returns hermite interpolation of `a, b, c, d` at normalized position `t`,
 * where `a` and `d` are used as predecessor/successor of `b` / `c` and only
 * inform the tangent of the interpolation curve. The interpolated result is
 * that of `b` and `c`.
 *
 * @remarks
 * Assumes all inputs are uniformly spaced. If that's not the case, use
 * {@link mixCubicHermite} with one of the tangent generators supporting
 * non-uniform spacing of points.
 *
 * [Interactive graph](https://www.desmos.com/calculator/j4gf8g9vkr)
 *
 * Source:
 * https://www.musicdsp.org/en/latest/Other/93-hermite-interpollation.html
 *
 * - {@link mixCubicHermite}
 * - {@link tangentCardinal}
 * - {@link tangentDiff3}
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param t -
 */
export const mixHermite: FnN5 = (a, b, c, d, t) => {
	const y1 = 0.5 * (c - a);
	const y2 = 1.5 * (b - c) + 0.5 * (d - a);
	return ((y2 * t + a - b + y1 - y2) * t + y1) * t + b;
};

/**
 * Computes cubic-hermite interpolation between `a` / `b` at normalized
 * time `t` and using respective tangents `ta` / `tb`.
 *
 * https://en.wikipedia.org/wiki/Cubic_Hermite_spline
 *
 * - {@link mixHermite}
 * - {@link tangentCardinal}
 * - {@link tangentDiff3}
 *
 * @param a -
 * @param ta -
 * @param b -
 * @param tb -
 * @param t -
 */
export const mixCubicHermite: FnN5 = (a, ta, b, tb, t) => {
	const s = t - 1;
	const t2 = t * t;
	const s2 = s * s;
	const h00 = (1 + 2 * t) * s2;
	const h10 = t * s2;
	const h01 = t2 * (3 - 2 * t);
	const h11 = t2 * s;
	return h00 * a + h10 * ta + h01 * b + h11 * tb;
};

/**
 * Similar to {@link mixCubicHermite}, but takes 4 control values (uniformly
 * spaced) and computes tangents automatically. Returns `b` iff `t=0` and `c`
 * iff `t=1.0`.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param t -
 */
export const mixCubicHermiteFromPoints: FnN5 = (a, b, c, d, t) => {
	d *= 0.5;
	const aa = -0.5 * a + 1.5 * b - 1.5 * c + d;
	const bb = a - 2.5 * b + 2 * c - d;
	const cc = -0.5 * a + 0.5 * c;
	const dd = b;
	const t2 = t * t;
	return t * t2 * aa + t2 * bb + t * cc + dd;
};

/**
 * Bicubic interpolation of given 4x4 sample values (in row major order, i.e.
 * `s00..s03` = 1st row).
 *
 * @remarks
 * Result will not be clamped and might fall outside the total range of the
 * input samples.
 *
 * @param s00 -
 * @param s01 -
 * @param s02 -
 * @param s03 -
 * @param s10 -
 * @param s11 -
 * @param s12 -
 * @param s13 -
 * @param s20 -
 * @param s21 -
 * @param s22 -
 * @param s23 -
 * @param s30 -
 * @param s31 -
 * @param s32 -
 * @param s33 -
 * @param u -
 * @param v -
 */
export const mixBicubic = (
	s00: number,
	s01: number,
	s02: number,
	s03: number,
	s10: number,
	s11: number,
	s12: number,
	s13: number,
	s20: number,
	s21: number,
	s22: number,
	s23: number,
	s30: number,
	s31: number,
	s32: number,
	s33: number,
	u: number,
	v: number
) =>
	mixCubicHermiteFromPoints(
		mixCubicHermiteFromPoints(s00, s01, s02, s03, u),
		mixCubicHermiteFromPoints(s10, s11, s12, s13, u),
		mixCubicHermiteFromPoints(s20, s21, s22, s23, u),
		mixCubicHermiteFromPoints(s30, s31, s32, s33, u),
		v
	);

/**
 * Parametric interpolation function for 4 samples `a`...`d` and interpolation
 * `kernel` and factor `t`. The interpolation is assumed to be between `b` and
 * `c`, using `a` and `d` as neighbors. Interpolation factor `t` is in the [0,1]
 * range.
 *
 * @remarks
 * The `kernel` is avaluated for 4 different `t`s @ `t-1`, `t`, `t+1`, `t+2`
 * (corresponding to samples `a`..`d`).
 *
 * This function can be used with e.g. {@link defLanczos} (filter radius=2) or
 * {@link defMitchell}.
 *
 * @param kernel
 * @param a
 * @param b
 * @param c
 * @param d
 * @param t
 */
export const mixKernel4 = (
	kernel: FnN,
	a: number,
	b: number,
	c: number,
	d: number,
	t: number
) => a * kernel(t + 1) + b * kernel(t) + c * kernel(t - 1) + d * kernel(t - 2);

/**
 * Helper function for {@link mixCubicHermite}. Computes cardinal tangents based
 * on point neighbors of a point B (not given), i.e. `a` (predecessor) and `c`
 * (successor) and their times (defaults to uniformly spaced). The optional
 * `tension` parameter can be used to scale the tangent where 0.0 produces a
 * Cardinal spline tangent and 1.0 a Catmull-Rom (opposite to the Wikipedia
 * ref).
 *
 * https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline
 *
 * @param prev -
 * @param next -
 * @param scale -
 * @param ta -
 * @param tc -
 */
export const tangentCardinal = (
	prev: number,
	next: number,
	scale = 0.5,
	ta = 0,
	tc = 2
) => scale * ((next - prev) / (tc - ta));

/**
 * Helper function for {@link mixCubicHermite}. Computes tangent for `curr`,
 * based on 3-point finite difference, where `prev` & `next` are `curr`'s
 * neighbors and the `tX` the three points' respective time values. The latter
 * are equally spaced by default (each 1.0 apart).
 *
 * Using this function with equal spacing of 1.0 and together with
 * {@link mixCubicHermite} will produce same results as the somewhat optimized
 * variant {@link mixHermite}.
 *
 * https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference
 *
 * @param prev -
 * @param curr -
 * @param next -
 * @param ta -
 * @param tb -
 * @param tc -
 */
export const tangentDiff3 = (
	prev: number,
	curr: number,
	next: number,
	ta = 0,
	tb = 1,
	tc = 2
) => 0.5 * ((next - curr) / (tc - tb) + (curr - prev) / (tb - ta));

/**
 * HOF interpolator. Takes a timing function `f` and interval `[from,to]`.
 * Returns function which takes normalized time (in `[0,1]` range) as single arg
 * and returns interpolated value.
 *
 * @example
 * ```ts tangle:../export/tween.ts
 * import { easeInOut2, tween } from "@thi.ng/math";
 *
 * // create tweening function
 * const anim = tween(easeInOut2, 100, 200);
 *
 * for(let i=0; i<=10; i++) console.log(anim(i / 10));
 * // 100
 * // 102
 * // 108
 * // 118
 * // 132
 * // 150
 * // 168
 * // 182
 * // 192
 * // 198
 * // 200
 * ```
 *
 * @param f -
 * @param from -
 * @param to -
 */
export const tween =
	(f: (t: number) => number, from: number, to: number) => (t: number) =>
		mix(from, to, f(t));

/**
 * Circular interpolation (ease out): `sqrt(1 - (1 - t)^2)`
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/tisoiazdrw)
 *
 * @param t - interpolation factor `[0,1]`
 */
export const circular: FnN = (t) => {
	t = 1 - t;
	return Math.sqrt(1 - t * t);
};

/**
 * Inverse/flipped version of {@link circular} (ease in).
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/tisoiazdrw)
 *
 * @param t - interpolation factor `[0,1]`
 */
export const invCircular: FnN = (t) => 1 - circular(1 - t);

/**
 * Zoomlens interpolation with customizable lens position, behavior and
 * strength.
 *
 * @remarks
 * Lens position must be given in `(0,1)` interval. Lens strength must be in
 * `[-1,1]` range. If negative, the lens will be bundling values near `pos`, if
 * positive the lens has dilating characteristics and will spread values near
 * `pos` towards the edges.
 *
 * Also see {@link schlick} for an alternative approach and {@link tween} for
 * reference to below example.
 *
 * @example
 * ```ts tangle:../export/lens.ts
 * import { mix, lens, tween } from "@thi.ng/math";
 * import { partial } from "@thi.ng/compose";
 *
 * // interpolated position in [100..400] interval for given `t`
 * // const y = mix(100, 400, lens(0.5, 1, t));
 *
 * // or compose tween function via `tween()` & `partial()`
 * const f = tween(partial(lens, 0.75, 1), 100, 400);
 *
 * for(let i=0; i<=10; i++) console.log(f(i / 10));
 * // 100.0
 * // 102.0
 * // 108.1
 * // 118.7
 * // 134.6
 * // 157.2
 * // 190.0
 * // 244.2
 * // 370.0
 * // 393.7
 * // 400.0
 * ```
 *
 * @param pos - lens pos
 * @param strength - lens strength
 * @param t - interpolation factor `[0,1]`
 */
export const lens: FnN3 = (pos, strength, t) => {
	const impl = strength > 0 ? invCircular : circular;
	const tp = 1 - pos;
	const tl = t <= pos ? impl(t / pos) * pos : 1 - impl((1 - t) / tp) * tp;
	return mix(t, tl, Math.abs(strength));
};

export const cosine: FnN = (t) => 1 - (Math.cos(t * PI) * 0.5 + 0.5);

export const decimated: FnN2 = (n, t) => Math.floor(t * n) / n;

/**
 * Spring oscillator with damping.
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/tywbpw8pck)
 *
 * @param k
 * @param amp
 * @param t
 */
export const bounce: FnN3 = (k, amp, t) => {
	const tk = t * k;
	return 1 - ((amp * Math.sin(tk)) / tk) * Math.cos(t * HALF_PI);
};

/**
 * Exponential easing.
 *
 * - `ease = 1` -> linear
 * - `ease > 1` -> ease in
 * - `ease < 1` -> ease out
 *
 * @param ease - easing behavior [0.0 .. ∞]
 * @param t -
 */
export const ease: FnN2 = (ease, t) => Math.pow(t, ease);

/**
 * Impulse generator. Peaks at `t = 1/k`
 *
 * @param k - impulse width (higher values => shorter impulse)
 */
export const impulse: FnN2 = (k, t) => {
	const h = k * t;
	return h * Math.exp(1 - h);
};

export const gain: FnN2 = (k, t) =>
	t < 0.5 ? 0.5 * Math.pow(2 * t, k) : 1 - 0.5 * Math.pow(2 - 2 * t, k);

export const parabola: FnN2 = (k, t) => Math.pow(4.0 * t * (1.0 - t), k);

export const cubicPulse: FnN3 = (w, c, t) => {
	t = Math.abs(t - c);
	return t > w ? 0 : ((t /= w), 1 - t * t * (3 - 2 * t));
};

/**
 * Unnormalized Sinc function: sin(x)/x. Returns 1 for t=0.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Sinc_function
 *
 * @param k -
 * @param t -
 */
export const sinc: FnN = (t) => (t !== 0 ? Math.sin(t) / t : 1);

/**
 * Normalized Sinc function, returns sinc(π*k*t).
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Sinc_function
 *
 * See {@link sinc}
 *
 * @param k -
 * @param t -
 */
export const sincNormalized: FnN2 = (k, t) => sinc(PI * k * t);

/**
 * Lanczos filter. Returns `sinc(πt)sinc(πt/a)` iff `t` in (-a,a) interval, else
 * returns 0.
 *
 * @remarks
 * References:
 *
 * - [Interactive graph](https://www.desmos.com/calculator/ccpog9yol8)
 * - https://en.wikipedia.org/wiki/Lanczos_resampling
 *
 * @param a -
 * @param t -
 */
export const lanczos: FnN2 = (a, t) =>
	t !== 0
		? -a < t && t < a
			? ((t *= PI), (a * Math.sin(t) * Math.sin(t / a)) / (t * t))
			: 0
		: 1;

/**
 * Higher-order version of {@link lanczos} for filter size `a` (should be 1, 2
 * or 3). Returns function which takes single param `t` and computes its Lanczos
 * filter coefficient.
 *
 * @param a
 */
export const defLanczos =
	(a: number): FnN =>
	(t) =>
		lanczos(a, t);

/**
 * Higher-order Mitchell-Netravali filter kernel for params `b` and `c`. Returns
 * function which takes single param `t` and computes its filter coefficient.
 *
 * @remarks
 * Default `b` and `c` values are: b=1/3, c=1/3. The returned function can be
 * used with {@link mixKernel4}.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Mitchell%E2%80%93Netravali_filters
 *
 * @param b
 * @param c
 */
export const defMitchell = (b = 1 / 3, c = 1 / 3) => {
	const b12 = 12 * b;
	const c6 = 6 * c;
	const k1 = 12 - 9 * b - c6;
	const k2 = -18 + b12 + c6;
	const k3 = 6 - 2 * b;
	const k4 = -b - c6;
	const k5 = 6 * b + 30 * c;
	const k6 = -b12 - 48 * c;
	const k7 = 8 * b + 24 * c;
	return (t: number) => {
		if (t < 0) t = -t;
		const t2 = t * t;
		return t < 1
			? (k1 * t2 * t + k2 * t2 + k3) / 6
			: t < 2
			? (k4 * t2 * t + k5 * t2 + k6 * t + k7) / 6
			: 0;
	};
};

/**
 * Sigmoid function for inputs arounds center bias.
 *
 * @remarks
 * Updated in v3.0.0 to add bias value to satisfy more use cases. Use
 * {@link sigmoid01} for old behavior.
 *
 * @param bias - center value (for which result = 0.5)
 * @param k - steepness
 * @param t - input value
 */
export const sigmoid: FnN3 = (bias, k, t) =>
	t != bias ? 1 / (1 + Math.exp(-k * (t - bias))) : 0.5;

/**
 * Sigmoid function for inputs in `[0,1]` interval. Center bias = 0.5.
 *
 * @param k - steepness
 * @param t - input value
 */
export const sigmoid01: FnN2 = (k, t) => sigmoid(0.5, k, t);

/**
 * Sigmoid function for inputs in `[-1,1]` interval. Center bias = 0
 *
 * @param k -
 * @param t -
 */
export const sigmoid11: FnN2 = (k, t) => sigmoid(0, k, t);

/**
 * Generalized Schlick bias gain curve, based on:
 * https://arxiv.org/abs/2010.09714
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/u6bkm5rb7t)
 *
 * @param a - curve strength. recommended `(0,64]`
 * @param b - pivot position `[0,1]`
 * @param t - input val `[0,1]`
 */
export const schlick: FnN3 = (a, b, t) =>
	t <= b
		? (b * t) / (t + a * (b - t) + EPS)
		: ((1 - b) * (t - 1)) / (1 - t - a * (b - t) + EPS) + 1;

/**
 * Computes exponential factor to interpolate from `a` to `b` over `num` steps.
 * I.e. multiplying `a` with the returned factor will yield `b` after `num`
 * steps. All args must be > 0.
 *
 * @param a -
 * @param b -
 * @param num -
 */
export const expFactor: FnN3 = (a, b, num) => (b / a) ** (1 / num);

/**
 * Computes gaussian bell curve for given center `bias` and `sigma` (spread).
 *
 * @remarks
 * [Interactive graph](https://www.desmos.com/calculator/aq6hdzxprv)
 *
 * @param bias -
 * @param sigma -
 * @param t -
 */
export const gaussian: FnN3 = (bias, sigma, t) =>
	Math.exp(-((t - bias) ** 2) / (2 * sigma * sigma));
