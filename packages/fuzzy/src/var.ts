import type { IObjectOf } from "@thi.ng/api";
import type { LVar } from "./api";

/**
 * Takes a `domain` interval and on object of named fuzzy sets and returns a new
 * Linguistic variable, which can then be used as input or output var for
 * {@link defuzz}.
 *
 * @example
 * ```ts
 * // temperature sets (in celsius)
 * const temp = variable([-20, 40], {
 *   freezing: invSigmoid(0, 2),
 *   cold: trapezoid(0, 4, 16, 20),
 *   warm: trapezoid(15, 20, 25, 30),
 *   hot: sigmoid(30, 2)
 * });
 * ```
 *
 * @param domain
 * @param terms
 */
export const variable = (
    domain: [number, number],
    terms: LVar["terms"]
): LVar => ({
    domain,
    terms,
});

/**
 * Takes an LVar and a domain value `x`. Returns the ID of the var's term which
 * produces the largest value for given `x`. If `strict` is enabled (default),
 * that max value MUST also be > 0.5 to be considered. Function returns
 * undefined if classification failed.
 *
 * @example
 * ```ts
 * // temperature sets (in celsius)
 * const temp = variable([-20, 40], {
 *   freezing: invSigmoid(0, 2),
 *   cold: trapezoid(0, 4, 16, 20),
 *   warm: trapezoid(15, 20, 25, 30),
 *   hot: sigmoid(30, 2)
 * });
 *
 * classify(temp, 28)
 * // "warm"
 * ```
 *
 * @param var
 * @param x
 * @param strict
 */
export const classify = ({ terms }: LVar, x: number, strict = true) => {
    let max = -Infinity;
    let maxID: string | undefined;
    for (let id in terms) {
        const t = terms[id](x);
        if (t > max && (!strict || t > 0.5)) {
            max = t;
            maxID = id;
        }
    }
    return maxID;
};

/**
 * Takes an LVar and a domain value `x`, evaluates all of var's terms for given
 * `x` and returns object of results.
 *
 * @example
 * ```ts
 * // temperature sets (in celsius)
 * const temp = variable([-20, 40], {
 *   freezing: invSigmoid(0, 2),
 *   cold: trapezoid(0, 4, 16, 20),
 *   warm: trapezoid(15, 20, 25, 30),
 *   hot: sigmoid(30, 2)
 * });
 *
 * evaluate(temp, 28)
 * // { freezing: 0, cold: 0, warm: 0.4, hot: 0.01798620996209156 }
 * ```
 *
 * @param var
 * @param x
 */
export const evaluate = ({ terms }: LVar, x: number) => {
    const res: IObjectOf<number> = {};
    for (let id in terms) {
        res[id] = terms[id](x);
    }
    return res;
};
