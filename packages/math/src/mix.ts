import { HALF_PI, PI } from "./api";

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * @example
 * ```ts
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
export const mixBilinear = (
    a: number,
    b: number,
    c: number,
    d: number,
    u: number,
    v: number
) => mix(mix(a, b, u), mix(c, d, u), v);

export const mixQuadratic = (a: number, b: number, c: number, t: number) => {
    const s = 1 - t;
    return a * s * s + b * 2 * s * t + c * t * t;
};

export const mixCubic = (
    a: number,
    b: number,
    c: number,
    d: number,
    t: number
) => {
    const t2 = t * t;
    const s = 1 - t;
    const s2 = s * s;
    return a * s2 * s + b * 3 * s2 * t + c * 3 * t2 * s + d * t2 * t;
};

/**
 * Returns hermite interpolation of `a, b, c, d` at normalized position
 * `t`, where `a` and `d` are used as predecessor/successor of `b` / `c`
 * and only inform the tangent of the interpolation curve. The
 * interpolated result is that of `b` and `c`.
 *
 * Assumes all inputs are uniformly spaced. If that's not the case, use
 * {@link mixCubicHermite} with one of the tangent generators supporting
 * non-uniform spacing of points.
 *
 * See: {@link https://www.desmos.com/calculator/j4gf8g9vkr}
 *
 * Source:
 * {@link https://www.musicdsp.org/en/latest/Other/93-hermite-interpollation.html}
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
export const mixHermite = (
    a: number,
    b: number,
    c: number,
    d: number,
    t: number
) => {
    const y1 = 0.5 * (c - a);
    const y2 = 1.5 * (b - c) + 0.5 * (d - a);
    return ((y2 * t + a - b + y1 - y2) * t + y1) * t + b;
};

/**
 * Computes cubic-hermite interpolation between `a` / `b` at normalized
 * time `t` and using respective tangents `ta` / `tb`.
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_Hermite_spline}
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
export const mixCubicHermite = (
    a: number,
    ta: number,
    b: number,
    tb: number,
    t: number
) => {
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
 * Helper function for {@link mixCubicHermite}. Computes cardinal tangents
 * based on point neighbors of a point B (not given), i.e. `a`
 * (predecessor) and `c` (successor) and their times (defaults to
 * uniformly spaced). The optional `tension` parameter can be used to
 * scale the tangent where 0.0 produces a Cardinal spline tangent and
 * 1.0 a Catmull-Rom (opposite to the Wikipedia ref).
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline}
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
 * based on 3-point finite difference, where `prev` & `next` are
 * `curr`'s neighbors and the `tX` the three points' respective time
 * values. The latter are equally spaced by default (each 1.0 apart).
 *
 * Using this function with equal spacing of 1.0 and together with
 * {@link mixCubicHermite} will produce same results as the somewhat
 * optimized variant {@link mixHermite}.
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference}
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
 * HOF interpolator. Takes a timing function `f` and interval `[from,
 * to]`. Returns function which takes normalized time as single arg and
 * returns interpolated value.
 *
 * @param f -
 * @param from -
 * @param to -
 */
export const tween = (f: (t: number) => number, from: number, to: number) => (
    t: number
) => mix(from, to, f(t));

/**
 * Circular interpolation (ease out): `sqrt(1 - (1 - t)^2)`
 *
 * Reference: https://www.desmos.com/calculator/tisoiazdrw
 *
 * @param t - interpolation factor [0..1]
 */
export const circular = (t: number) => {
    t = 1 - t;
    return Math.sqrt(1 - t * t);
};

/**
 * Inverse/flipped version of {@link circular} (ease in).
 *
 * Reference: https://www.desmos.com/calculator/tisoiazdrw
 *
 * @param t - interpolation factor [0..1]
 */
export const invCircular = (t: number) => 1 - circular(1 - t);

/**
 * Zoomlens interpolation with customizable lens position, behavior and
 * strength.
 *
 * @remarks
 * Lens position must be given in (0..1) interval. Lens strength must be in
 * [-1,1] range. If negative, the lens will be bundling values near `pos`, if
 * positive the lens has dilating characteristics and will spread values near
 * `pos` towards the edges.
 *
 * @example
 * ```ts
 * // interpolated position in [100..400] interval for given `t`
 * y = mix(100, 400, lens(0.5, 1, t));
 *
 * // or build tween function via `tween()`
 * f = tween(partial(lens, 0.5, 1), 100, 400);
 *
 * f(t)
 * ```
 *
 * @param pos - lens pos
 * @param strength - lens strength
 * @param t - interpolation factor [0..1]
 */
export const lens = (pos: number, strength: number, t: number) => {
    const impl = strength > 0 ? invCircular : circular;
    const tp = 1 - pos;
    const tl = t <= pos ? impl(t / pos) * pos : 1 - impl((1 - t) / tp) * tp;
    return mix(t, tl, Math.abs(strength));
};

export const cosine = (t: number) => 1 - (Math.cos(t * PI) * 0.5 + 0.5);

export const decimated = (n: number, t: number) => Math.floor(t * n) / n;

export const bounce = (k: number, amp: number, t: number) => {
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
export const ease = (ease: number, t: number) => Math.pow(t, ease);

/**
 * Impulse generator. Peaks at `t = 1/k`
 *
 * @param k - impulse width (higher values => shorter impulse)
 */
export const impulse = (k: number, t: number) => {
    const h = k * t;
    return h * Math.exp(1 - h);
};

export const gain = (k: number, t: number) =>
    t < 0.5 ? 0.5 * Math.pow(2 * t, k) : 1 - 0.5 * Math.pow(2 - 2 * t, k);

export const parabola = (k: number, t: number) =>
    Math.pow(4.0 * t * (1.0 - t), k);

export const cubicPulse = (w: number, c: number, t: number) => {
    t = Math.abs(t - c);
    return t > w ? 0 : ((t /= w), 1 - t * t * (3 - 2 * t));
};

export const sinc = (k: number, t: number) => {
    t = PI * (k * t - 1.0);
    return Math.sin(t) / t;
};

/**
 * Sigmoid function for inputs in [0..1] interval.
 *
 * @param k -
 * @param t -
 */
export const sigmoid = (k: number, t: number) =>
    1 / (1 + Math.exp(-k * (2 * t - 1)));

/**
 * Sigmoid function for inputs in [-1..+1] interval.
 *
 * @param k -
 * @param t -
 */
export const sigmoid11 = (k: number, t: number) => 1 / (1 + Math.exp(-k * t));

/**
 * Computes exponential factor to interpolate from `a` to `b` over
 * `num` steps. I.e. multiplying `a` with the returned factor will yield
 * `b` after `num` steps. All args must be > 0.
 *
 * @param a
 * @param b
 * @param num
 */
export const expFactor = (a: number, b: number, num: number) =>
    (b / a) ** (1 / num);
