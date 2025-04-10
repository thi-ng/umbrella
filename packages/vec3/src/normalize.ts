// SPDX-License-Identifier: Apache-2.0
import { EPS } from "@thi.ng/math/api";
import type { VecOpVO } from "@thi.ng/vec-api";
import { magSq3 } from "./mag.js";
import { mulN3 } from "./muln.js";
import { set3 } from "./set.js";

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize3: VecOpVO<number> = (out, v, n = 1) => {
	!out && (out = v);
	const m = Math.sqrt(magSq3(v));
	return m >= EPS ? mulN3(out, v, n / m) : out !== v ? set3(out, v) : out;
};
