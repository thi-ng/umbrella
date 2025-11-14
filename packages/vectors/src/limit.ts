// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoV, VecOpV, VecOpVN } from "./api.js";
import { magSq, magSq2, magSq3, magSq4 } from "./magsq.js";
import { mulN, mulN2, mulN3, mulN4 } from "./muln.js";
import { set, set2, set3, set4 } from "./set.js";

const $ =
	(magSq: VecOpRoV<number>, mulN: VecOpVN, set: VecOpV): VecOpVN =>
	(out, v, n) => {
		!out && (out = v);
		const m = magSq(v);
		return m > n * n
			? mulN(out, v, n / Math.sqrt(m))
			: out !== v
			? set(out, v)
			: out;
	};

/**
 * Limits nD vector `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit = $(magSq, mulN, set);

/**
 * Limits 2D vector `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit2 = $(magSq2, mulN2, set2);

/**
 * Limits 3D vector `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit3 = $(magSq3, mulN3, set3);

/**
 * Limits 4D vector `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit4 = $(magSq4, mulN4, set4);
