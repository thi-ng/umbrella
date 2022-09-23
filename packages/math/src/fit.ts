import type { FnN3, FnN5 } from "@thi.ng/api";
import { clamp01, clamp11 } from "./interval.js";

/**
 * Returns normalized value of `x` WRT to interval `a .. b`. If `a`
 * equals `b`, returns 0.
 *
 * @param x -
 * @param a -
 * @param b -
 */
export const norm: FnN3 = (x, a, b) => (b !== a ? (x - a) / (b - a) : 0);

/**
 * Returns a number in the `[c,d]` interval which is relative to `x` in the
 * `[a,b]` interval. **No** clamping will be performed if `x` lies outside the
 * original range (for that use {@link fitClamped} instead).
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 */
export const fit: FnN5 = (x, a, b, c, d) => c + (d - c) * norm(x, a, b);

/**
 * Clamped version of {@link fit}, i.e. before mapping `x` into the target
 * interval `[c,d]`, it will be clamped to the source interval `[a,b]`.
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 */
export const fitClamped: FnN5 = (x, a, b, c, d) =>
	c + (d - c) * clamp01(norm(x, a, b));

/**
 * Similar to {@link fitClamped}, assuming [0,1] as source interval.
 *
 * @param x
 * @param a
 * @param b
 */
export const fit01: FnN3 = (x, a, b) => a + (b - a) * clamp01(x);

/**
 * Similar to {@link fitClamped}, assuming the reverse ordered [1,0] as source
 * interval.
 *
 * @param x
 * @param a
 * @param b
 */
export const fit10: FnN3 = (x, a, b) => b + (a - b) * clamp01(x);

/**
 * Similar to {@link fitClamped}, assuming [-1,1] as source interval.
 *
 * @param x
 * @param a
 * @param b
 */
export const fit11: FnN3 = (x, a, b) => a + (b - a) * (0.5 + 0.5 * clamp11(x));
