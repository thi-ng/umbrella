import type { Nullable } from "@thi.ng/api";
import type { IRandom } from "../api.js";
import { SYSTEM } from "../system.js";

/**
 * HOF. Returns zero-arg function, yielding values with normal distribution
 * for given `bias` and standard deviation `sigma`.
 *
 * @remarks
 * Also see {@link gaussian} for alternative implementation.
 *
 * @param rnd -
 * @param bias -
 * @param sigma -
 */
export const normal = (rnd: IRandom = SYSTEM, bias = 0, sigma = 1) => {
	let a: Nullable<number>;
	let b: number;
	let r: number;
	return () => {
		if (a != null) {
			b = a;
			a = null;
		} else {
			do {
				a = rnd.norm();
				b = rnd.norm();
				r = a * a + b * b;
			} while (r > 1 || r === 0);
		}
		return bias + sigma * b! * Math.sqrt((-2 * Math.log(r)) / r);
	};
};
