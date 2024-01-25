import type { FnN2 } from "@thi.ng/api";
import { EPS } from "./api.js";

/**
 * Returns the absolute difference between `a` and `b`.
 *
 * @param a
 * @param b
 */
export const absDiff: FnN2 = (a, b) => Math.abs(a - b);

/**
 * Similar to `Math.sign()`, but uses `eps` to determine the zero value (i.e. if
 * `x` is in [-eps,eps] interval).
 *
 * @param x
 * @param eps
 */
export const sign = (x: number, eps = EPS) => (x > eps ? 1 : x < -eps ? -1 : 0);

/**
 * Raises `x` to `k` power and multiplies it with the {@link sign} of `x`, using
 * `eps` to determine zero.
 *
 * @param x
 * @param k
 * @param eps
 */
export const signedPow = (x: number, k: number, eps = EPS) =>
	sign(x, eps) * Math.abs(x) ** k;
