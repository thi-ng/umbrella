import type { FnN2 } from "@thi.ng/api";
import { norm } from "./fit";

// https://en.wikipedia.org/wiki/T-norm

export const tnormMin: FnN2 = (a, b) => Math.min(a, b);

export const tnormProduct: FnN2 = (a, b) => a * b;

export const tnormLukasiewicz: FnN2 = (a, b) => Math.max(0, a + b - 1);

export const tnormDrastic: FnN2 = (a, b) => (a === 1 ? b : b === 1 ? a : 0);

export const tnormNilpotent: FnN2 = (a, b) => (a + b > 1 ? Math.min(a, b) : 0);

/**
 * HOF T-norm. Parametric Hamacher with `p` controlling curvature.
 *
 * @param p - curve param (default: 2)
 */
export const tnormHamacher = (p = 2): FnN2 => (a, b) =>
    a === 0 && b === 0 ? 0 : (a * b) / (p + (1 - p) * (a + b - a * b));

/**
 * S-norm (T-conorm), dual of {@link tnormMin}.
 *
 * @param a
 * @param b
 */
export const snormMax: FnN2 = (a, b) => Math.max(a, b);

/**
 * S-norm (T-conorm), dual of {@link tnormProduct}, probabilistic sum:
 * `a + b - a * b`
 *
 * @param a
 * @param b
 */
export const snormProbabilistic: FnN2 = (a, b) => a + b - a * b;

/**
 * S-norm (T-conorm), dual of {@link tnormLukasiewicz}.
 *
 * @param a
 * @param b
 */
export const snormBoundedSum: FnN2 = (a, b) => Math.min(a + b, 1);

/**
 * S-norm (T-conorm), dual of {@link tnormDrastic}.
 */
export const snormDrastic: FnN2 = (a, b) => (a === 0 ? b : b === 0 ? a : 1);

/**
 * S-norm (T-conorm), dual of {@link tnormNilpotent}.
 *
 * @param a
 * @param b
 */
export const snormNilpotent: FnN2 = (a, b) => (a + b < 1 ? Math.max(a, b) : 1);

/**
 * S-norm (T-conorm), dual of {@link tnormHamacher}, iff that T-norm's curve
 * param is `p=2`.
 *
 * @param a
 * @param b
 */
export const snormEinstein: FnN2 = (a, b) => (a + b) / (1 + a * b);

/**
 * HOF t-norm. Constructs a new t-norm based on given t-norms for disjoint
 * subintervals, completing remaining regions via {@link min}.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Construction_of_t-norms#Ordinal_sums
 *
 * @param specs
 */
export const ordinalSum = (
    specs: { domain: [number, number]; tnorm: FnN2 }[]
): FnN2 => (x, y) => {
    for (let s of specs) {
        const [a, b] = s.domain;
        if (x >= a && x <= b && y >= a && y <= b) {
            return a + (b - a) * s.tnorm(norm(x, a, b), norm(y, a, b));
        }
    }
    return Math.min(x, y);
};
