import { EPS } from "./api";

/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a
 * @param b
 */
export const fmod = (a: number, b: number) =>
    a - b * Math.floor(a / b);

export const fract = (x: number) =>
    x - Math.floor(x);

export const trunc = (x: number) =>
    x < 0 ? Math.ceil(x) : Math.floor(x);

export const roundTo = (x: number, prec = 1) =>
    Math.round(x / prec) * prec;

/**
 * Only rounds `x` to nearest int if `fract(x)` < `eps` or > `1-eps`.
 *
 * @param x
 * @param eps
 */
export const roundEps = (x: number, eps = EPS) => {
    const f = fract(x);
    return f <= eps || f >= 1 - eps ?
        Math.round(x) :
        x;
};
