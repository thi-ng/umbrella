import type { IRandom } from "./api.js";
import { SYSTEM } from "./system.js";

/**
 * Returns true w/ a (theoretical) probability of 50% (obviously depending on
 * quality of given {@link IRandom}) PRNG.
 *
 * @remarks
 * Also see {@link fairCoin} and {@link IRandom.probability}.
 *
 * @param rnd -
 */
export const coin = (rnd: IRandom = SYSTEM) => rnd.float() < 0.5;

/**
 * Similar to {@link coin}, but more strict. Calls {@link coin} in a pairwise
 * manner as long as both results are equal (and discarding results). Otherwise
 * returns result of first call.
 *
 * @remarks
 * Reference:
 * https://en.m.wikipedia.org/wiki/Fair_coin#Fair_results_from_a_biased_coin
 *
 * @param rnd -
 */
export const fairCoin = (rnd: IRandom = SYSTEM) => {
	let a: boolean, b: boolean;
	do {
		a = coin(rnd);
		b = coin(rnd);
	} while (a === b);
	return a;
};
