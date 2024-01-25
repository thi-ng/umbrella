import type { ReadonlyVec } from "./api.js";
import { mag } from "./mag.js";
import { vmean } from "./mean.js";
import { mul } from "./mul.js";
import { subN } from "./subn.js";
import { sum } from "./sum.js";
import { sd } from "./variance.js";

/**
 * Computes the linear regression between two sets of variables (each given as a
 * vector).
 *
 * @remarks
 * Returns an object with the following keys:
 *
 * - `sda`/`sdb`: Standard deviation
 * - `ma`/`mb`: Mean
 * - `r`: Pearson’s correlation coefficient
 * - `slope`: Slope of regression line
 * - `y0`: Y-intercept of regression line
 *
 * If `a` or `b` is a zero vector, the `r`, `slope` values will be 0 too.
 *
 * @param a
 * @param b
 */
export const linReg = (a: ReadonlyVec, b: ReadonlyVec) => {
	const ma = vmean(a);
	const mb = vmean(b);
	a = subN([], a, ma);
	b = subN([], b, mb);
	const sda = sd(a, true);
	const sdb = sd(b, true);
	const m = mag(a) * mag(b);
	if (m === 0) return { ma, mb, sda, sdb, r: 0, slope: 0, y0: mb };
	const r = sum(mul(null, a, b)) / m;
	const slope = r * (sdb / sda);
	const y0 = mb - slope * ma;
	return { ma, mb, sda, sdb, r, slope, y0 };
};
