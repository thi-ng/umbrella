import type { FnN, FnN2 } from "@thi.ng/api";
import { EPS } from "./api";

/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a -
 * @param b -
 */
export const fmod: FnN2 = (a, b) => a - b * Math.floor(a / b);

export const fract: FnN = (x) => x - Math.floor(x);

export const trunc: FnN = (x) => (x < 0 ? Math.ceil(x) : Math.floor(x));

export const roundTo = (x: number, prec = 1) => Math.round(x / prec) * prec;

/**
 * Only rounds `x` to nearest int if `fract(x)` <= `eps` or >= `1-eps`.
 *
 * @param x -
 * @param eps -
 */
export const roundEps = (x: number, eps = EPS) => {
    const f = fract(x);
    return f <= eps || f >= 1 - eps ? Math.round(x) : x;
};
