import { EPS } from "./api.js";

/**
 * Recursively evaluates function `fn` for `res` uniformly spaced values
 * `t` in the closed parametric interval `[start,end]` and computes
 * corresponding sample values `p`. For each `p` then calls `error`
 * function to compute the error to query target value `q` and
 * eventually returns the `t` producing the overall minimum error. At
 * each level of recursion the search interval is increasingly narrowed
 * / centered around the best `t` of the current iteration.
 *
 * The search is terminated early if the best error value is less than
 * `eps`.
 *
 * The interval end points `start` and `end` MUST be normalized values
 * in the closed [0,1] interval.
 *
 * @param fn - function to evaluate
 * @param error - error function
 * @param q - target value
 * @param res - number of samples per interval
 * @param iter - max number of iterations / recursion limit
 * @param start - interval start
 * @param end - interval end
 */
export const minError = <T>(
	fn: (x: number) => T,
	error: (p: T, q: T) => number,
	q: T,
	res = 16,
	iter = 8,
	start = 0,
	end = 1,
	eps = EPS
): number => {
	if (iter <= 0) return (start + end) / 2;
	const delta = (end - start) / res;
	let minT = start;
	let minE = Infinity;
	for (let i = 0; i <= res; i++) {
		const t = start + i * delta;
		const e = error(q, fn(t));
		if (e < minE) {
			if (e <= eps) return t;
			minE = e;
			minT = t;
		}
	}
	return minError(
		fn,
		error,
		q,
		res,
		iter - 1,
		Math.max(minT - delta, 0),
		Math.min(minT + delta, 1)
	);
};
