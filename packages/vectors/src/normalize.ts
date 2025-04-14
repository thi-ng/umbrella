// SPDX-License-Identifier: Apache-2.0
import { EPS } from "@thi.ng/math/api";
import type { VecOpRoV, VecOpV, VecOpVN, VecOpVO } from "./api.js";
import { magSq, magSq2, magSq3, magSq4 } from "./magsq.js";
import { mulN, mulN2, mulN3, mulN4 } from "./muln.js";
import { set, set2, set3, set4 } from "./set.js";

const $ =
	(magSq: VecOpRoV<number>, mulN: VecOpVN, set: VecOpV): VecOpVO<number> =>
	(out, v, n = 1) => {
		!out && (out = v);
		const m = Math.sqrt(magSq(v));
		return m >= EPS ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
	};

/**
 * Normalizes nD vector to given (optional) length (default: 1). If `out` is
 * null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize = $(magSq, mulN, set);

/**
 * Normalizes 2D vector to given (optional) length (default: 1). If `out` is
 * null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize2 = $(magSq2, mulN2, set2);

/**
 * Normalizes 3D vector to given (optional) length (default: 1). If `out` is
 * null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize3 = $(magSq3, mulN3, set3);

/**
 * Normalizes 4D vector to given (optional) length (default: 1). If `out` is
 * null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize4 = $(magSq4, mulN4, set4);
