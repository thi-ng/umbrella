import { PI, HALF_PI } from "./api";

export const mix = (a: number, b: number, t: number) =>
    a + (b - a) * t;

/**
 * ```
 * c    d
 * +----+
 * |    |
 * +----+
 * a    b
 * ```
 *
 * @param a BL value
 * @param b BR value
 * @param c TL value
 * @param d TR value
 * @param u 1st interpolation factor
 * @param v 2nd interpolation factor
 */
export const mixBilinear = (a: number, b: number, c: number, d: number, u: number, v: number) =>
    mix(mix(a, b, u), mix(c, d, u), v);

export const mixQuadratic = (a: number, b: number, c: number, t: number) => {
    const s = 1 - t;
    return a * s * s + b * 2 * s * t + c * t * t;
};

export const mixCubic = (a: number, b: number, c: number, d: number, t: number) => {
    const t2 = t * t;
    const s = 1 - t;
    const s2 = s * s;
    return a * s2 * s + b * 3 * s2 * t + c * 3 * t2 * s + d * t2 * t;
};

export const tween = (f: (t: number) => number, from: number, to: number) =>
    (t: number) => mix(from, to, f(t));

/**
 * Circular interpolation: `sqrt(1 - (1 - t)^2)`
 *
 * @param t interpolation factor (0.0 .. 1.0)
 */
export const circular = (t: number) => {
    t = 1 - t;
    return Math.sqrt(1 - t * t);
};

export const cosine = (t: number): number =>
    1 - (Math.cos(t * PI) * 0.5 + 0.5);

export const decimated = (n: number, t: number) =>
    Math.floor(t * n) / n;

export const bounce = (k: number, amp: number, t: number) => {
    const tk = t * k;
    return 1 - amp * Math.sin(tk) / tk * Math.cos(t * HALF_PI);
};

/**
 * HOF exponential easing.
 *
 * - `ease = 1` -> linear
 * - `ease > 1` -> ease in
 * - `ease < 1` -> ease out
 *
 * @param ease easing behavior [0.0 .. ∞]
 * @param t
 */
export const ease = (ease: number, t: number) =>
    Math.pow(t, ease);

/**
 * HOF impulse generator. Peaks at `t=1/k`
 *
 * @param k impulse width (higher values => shorter impulse)
 */
export const impulse = (k: number, t: number) => {
    const h = k * t;
    return h * Math.exp(1 - h);
};

export const gain = (k: number, t: number) =>
    t < 0.5 ?
        0.5 * Math.pow(2 * t, k) :
        1 - 0.5 * Math.pow(2 - 2 * t, k);

export const parabola = (k: number, t: number) =>
    Math.pow(4.0 * t * (1.0 - t), k);

export const cubicPulse = (w: number, c: number, t: number) => {
    t = Math.abs(t - c);
    return t > w ?
        0 :
        (t /= w, 1 - t * t * (3 - 2 * t));
};

export const sinc = (k: number, t: number) => {
    t = PI * (k * t - 1.0);
    return Math.sin(t) / t;
};
