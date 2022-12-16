import type { IRandom } from "../api.js";
import { SYSTEM } from "../system.js";

/**
 * Higher order function. Takes a {@link IRandom} instance and returns a no-arg
 * function which produces values with approx. normal distribution using CLT
 * (Central Limit Theorem).
 *
 * @remarks
 * The default configuration produces samples in the approx. [-0.5,0.5] range
 * with a ~12% standard deviation.
 *
 * Reference: https://en.wikipedia.org/wiki/Central_limit_theorem
 *
 * @param rnd - default `SYSTEM`
 * @param n - num samples, default 24
 * @param offset - center offset / bias, default 0
 * @param scale - scale, default 1
 */
export const gaussian =
	(rnd: IRandom = SYSTEM, n = 24, offset = 0, scale = 1) =>
	() => {
		let sum = 0;
		let m = n;
		while (m-- > 0) sum += rnd.norm(scale);
		return sum / n + offset;
	};
