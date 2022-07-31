import type { LVar, LVarDomain } from "./api.js";

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
 * @param domain -
 * @param terms -
 */
export const variable = <K extends string>(
	domain: LVarDomain,
	terms: LVar<K>["terms"]
): LVar<K> => ({
	domain,
	terms,
});

/**
 * Takes an LVar and a domain value `x`. Returns the ID of the var's fuzzy set
 * term which yields the max truth value for given `x`. If `threshold` is
 * enabled (default: 0.5), any truth value MUST also be > `threshold` to be
 * considered. The function returns undefined if classification failed.
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
 * @param var -
 * @param x -
 * @param threshold -
 */
export const classify = <K extends string>(
	{ terms }: LVar<K>,
	x: number,
	threshold = 0.5
) => {
	let max = threshold;
	let maxID: K | undefined;
	for (let id in terms) {
		const t = terms[id](x);
		if (t >= max) {
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
 * @param var -
 * @param x -
 */
export const evaluate = <K extends string>({ terms }: LVar<K>, x: number) => {
	const res = <Record<K, number>>{};
	for (let id in terms) {
		res[id] = terms[id](x);
	}
	return res;
};
