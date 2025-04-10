// SPDX-License-Identifier: Apache-2.0
import { EPS } from "@thi.ng/math/api";
import type { VecOpVO } from "@thi.ng/vec-api";
import { magSq2 } from "./magsq.js";
import { mulN2 } from "./muln.js";
import { set2 } from "./set.js";

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize2: VecOpVO<number> = (out, v, n = 1) => {
	!out && (out = v);
	const m = Math.sqrt(magSq2(v));
	return m >= EPS ? mulN2(out, v, n / m) : out !== v ? set2(out, v) : out;
};
