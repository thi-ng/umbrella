// SPDX-License-Identifier: Apache-2.0
import type { VecOpVVO } from "./api.js";
import { normalize, normalize2, normalize3 } from "./normalize.js";
import { sub, sub2, sub3 } from "./sub.js";

/**
 * Computes nD direction vector `a`->`b`, normalized to length `n` (default 1).
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const direction: VecOpVVO<number> = (out, a, b, n) =>
	normalize(null, sub(out || a, b, a), n);

/**
 * Computes 2D direction vector `a`->`b`, normalized to length `n` (default 1).
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const direction2: VecOpVVO<number> = (out, a, b, n) =>
	normalize2(null, sub2(out || a, b, a), n);

/**
 * Computes 3D direction vector `a`->`b`, normalized to length `n` (default 1).
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const direction3: VecOpVVO<number> = (out, a, b, n) =>
	normalize3(null, sub3(out || a, b, a), n);
