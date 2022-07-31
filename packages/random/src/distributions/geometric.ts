import type { IRandom } from "../api.js";
import { SYSTEM } from "../system.js";

/**
 * HOF. Returns zero-arg function, yielding values in geometric distribution,
 * aka the number of independent trials required for the first occurrence of
 * success, and each trial using the given success probability `p`.
 *
 * @remarks
 * Returns 0 for p <= 0 and 1 for p >= 1.
 *
 * Reference: https://en.wikipedia.org/wiki/Geometric_distribution
 *
 * @param rnd -
 * @param p - probability (0,1]
 */
export const geometric = (rnd: IRandom = SYSTEM, p = 0.5) =>
	p <= 0
		? () => Infinity
		: p >= 1
		? () => 1
		: ((p = Math.log(1 - p)),
		  () => Math.floor(Math.log(1 - rnd.float(1)) / p) + 1);
