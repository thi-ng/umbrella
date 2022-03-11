import type { FnN2, Range } from "@thi.ng/api";
import { norm } from "@thi.ng/math/fit";
import { clamp0 } from "@thi.ng/math/interval";

// https://en.wikipedia.org/wiki/T-norm

export const tnormMin: FnN2 = (x, y) => Math.min(x, y);

export const tnormProduct: FnN2 = (x, y) => x * y;

export const tnormLukasiewicz: FnN2 = (x, y) => clamp0(x + y - 1);

export const tnormDrastic: FnN2 = (x, y) => (x === 1 ? y : y === 1 ? x : 0);

export const tnormNilpotent: FnN2 = (x, y) => (x + y > 1 ? Math.min(x, y) : 0);

/**
 * HOF T-norm. Parametric Hamacher with `p` controlling curvature.
 *
 * @remarks
 * Interactive graph: https://www.desmos.com/calculator/4bneccqs3p
 *
 * @param p - curve param [0..∞], default: 2
 */
export const tnormHamacher =
    (p = 2): FnN2 =>
    (x, y) =>
        x === 0 && y === 0 ? 0 : (x * y) / (p + (1 - p) * (x + y - x * y));

/**
 * HOF T-norm. Parametric Yager with `p` controlling curvature.
 *
 * @remarks
 * Interactive graph: https://www.desmos.com/calculator/4bneccqs3p
 *
 * @param p - curve param [0..∞], default: 2
 */
export const tnormYager = (p = 2): FnN2 =>
    p === 0
        ? () => 0
        : (x, y) => clamp0(1 - ((1 - x) ** p + (1 - y) ** p) ** (1 / p));

/**
 * HOF T-norm. Parametric Dombi with `p` controlling curvature.
 *
 * @remarks
 * Interactive graph: https://www.desmos.com/calculator/4bneccqs3p
 *
 * @param p - curve param [0..∞], default: 2
 */
export const tnormDombi = (p = 2): FnN2 =>
    p === 0
        ? () => 0
        : (x, y) =>
              x === 0 || y === 0
                  ? 0
                  : 1 /
                    (1 + (((1 - x) / x) ** p + ((1 - y) / y) ** p) ** (1 / p));

/**
 * HOF T-norm. Parametric Aczél–Alsina with `p` controlling curvature.
 *
 * @remarks
 * Interactive graph: https://www.desmos.com/calculator/4bneccqs3p
 *
 * @param p - curve param [0..∞], default: 2
 */
export const tnormAczelAlsina =
    (p = 2): FnN2 =>
    (x, y) =>
        Math.exp(
            -(
                (Math.abs(Math.log(x)) ** p + Math.abs(Math.log(y)) ** p) **
                (1 / p)
            )
        );
/**
 * S-norm (T-conorm), dual of {@link tnormMin}.
 *
 * @param x - 
 * @param y - 
 */
export const snormMax: FnN2 = (x, y) => Math.max(x, y);

/**
 * S-norm (T-conorm), dual of {@link tnormProduct}, probabilistic sum:
 * `a + b - a * b`
 *
 * @param x - 
 * @param y - 
 */
export const snormProbabilistic: FnN2 = (x, y) => x + y - x * y;

/**
 * S-norm (T-conorm), dual of {@link tnormLukasiewicz}.
 *
 * @param x - 
 * @param y - 
 */
export const snormBoundedSum: FnN2 = (x, y) => Math.min(x + y, 1);

/**
 * S-norm (T-conorm), dual of {@link tnormDrastic}.
 */
export const snormDrastic: FnN2 = (x, y) => (x === 0 ? y : y === 0 ? x : 1);

/**
 * S-norm (T-conorm), dual of {@link tnormNilpotent}.
 *
 * @param x - 
 * @param y - 
 */
export const snormNilpotent: FnN2 = (x, y) => (x + y < 1 ? Math.max(x, y) : 1);

/**
 * S-norm (T-conorm), dual of {@link tnormHamacher}, iff that T-norm's curve
 * param is `p=2`.
 *
 * @param x - 
 * @param y - 
 */
export const snormEinstein: FnN2 = (x, y) => (x + y) / (1 + x * y);

/**
 * HOF t-norm. Constructs a new t-norm based on given t-norms for disjoint
 * subintervals, completing remaining regions via {@link min}.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Construction_of_t-norms#Ordinal_sums
 *
 * @param specs - 
 */
export const ordinalSum =
    (specs: { domain: Range; tnorm: FnN2 }[]): FnN2 =>
    (x, y) => {
        for (let s of specs) {
            const [a, b] = s.domain;
            if (x >= a && x <= b && y >= a && y <= b) {
                return a + (b - a) * s.tnorm(norm(x, a, b), norm(y, a, b));
            }
        }
        return Math.min(x, y);
    };
