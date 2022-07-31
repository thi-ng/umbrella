import { EPS } from "@thi.ng/math/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { ReadonlyMat } from "./api.js";

/**
 * Returns true, if given square matrix of size `n` is orthagonal, i.e.
 * check if `A * AT = I`.
 *
 * {@link https://en.wikipedia.org/wiki/Orthogonal_matrix}
 *
 * @param m -
 * @param n -
 * @param eps -
 */
export const isOrthagonal = (m: ReadonlyMat, n: number, eps = EPS) => {
	for (let i = 0; i < n; i++) {
		const ii = i * n;
		for (let j = 0; j < n; j++) {
			const jj = j * n;
			let acc = 0;
			for (let k = 0; k < n; k++) {
				acc += m[ii + k] * m[jj + k];
			}
			if (
				(i == j && !eqDelta(acc, 1, eps)) ||
				(i != j && !eqDelta(acc, 0, eps))
			) {
				return false;
			}
		}
	}
	return true;
};
