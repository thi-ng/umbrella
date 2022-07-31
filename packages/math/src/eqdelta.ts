import { EPS } from "./api.js";

const abs = Math.abs;
const max = Math.max;

/**
 * Similar to {@link eqDeltaScaled}, but uses given `eps` as is.
 *
 * @param a - left value
 * @param b - right value
 * @param eps - epsilon / tolerance, default `1e-6`
 */
export const eqDelta = (a: number, b: number, eps = EPS) => abs(a - b) <= eps;

/**
 * Checks if `|a - b| <= ε` and adapts given epsilon value to the given
 * arguments:
 *
 * ε is factored with the largest absolute value of `a` or `b` (but
 * never lesser than the given `eps` value):
 *
 * `ε = ε * max(1, |a|, |b|)`
 *
 * @param a - left value
 * @param b - right value
 * @param eps - epsilon / tolerance, default `1e-6`
 */
export const eqDeltaScaled = (a: number, b: number, eps = EPS) =>
	abs(a - b) <= eps * max(1, abs(a), abs(b));
