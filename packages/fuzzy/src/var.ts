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
 *   freezing: negate(sigmoid(0, 2)),
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
 * Takes an LVar and a domain value. Returns the ID of the var's term which
 * produces the largest value for given `x`.
 *
 * @param var
 * @param x
 */
export const classify = ({ terms }: LVar, x: number) => {
    let max = -Infinity;
    let maxID: string | undefined;
    for (let id in terms) {
        const t = terms[id](x);
        if (t > max) {
            max = t;
            maxID = id;
        }
    }
    return maxID;
};
