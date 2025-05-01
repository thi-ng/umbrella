// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { magSq } from "./magsq.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";

/**
 * Normalizes tensor `a` to given magnitude `n` (default: 1) and writes result
 * to `out`. If `out` is null, mutates `a`.
 *
 * @param out
 * @param a
 * @param n
 */
export const normalize = (out: ITensor | null, a: ITensor, n = 1) => {
	!out && (out = a);
	const m = Math.sqrt(magSq(a));
	return m >= 1e-6 ? mulN(out || a, a, n / m) : out !== a ? set(out, a) : out;
};
