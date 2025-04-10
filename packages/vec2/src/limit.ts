// SPDX-License-Identifier: Apache-2.0
import type { VecOpVN } from "@thi.ng/vec-api";
import { magSq2 } from "./magsq.js";
import { mulN2 } from "./muln.js";
import { set2 } from "./set.js";

/**
 * Limits `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit2: VecOpVN = (out, v, n) => {
	!out && (out = v);
	const m = magSq2(v);
	return m > n * n
		? mulN2(out, v, n / Math.sqrt(m))
		: out !== v
		? set2(out, v)
		: out;
};
