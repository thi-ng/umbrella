// SPDX-License-Identifier: Apache-2.0
import type { VecOpVN } from "@thi.ng/vec-api";
import { magSq3 } from "./mag.js";
import { mulN3 } from "./muln.js";
import { set3 } from "./set.js";

/**
 * Limits `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit3: VecOpVN = (out, v, n) => {
	!out && (out = v);
	const m = magSq3(v);
	return m > n * n
		? mulN3(out, v, n / Math.sqrt(m))
		: out !== v
		? set3(out, v)
		: out;
};
