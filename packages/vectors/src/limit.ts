import type { VecOpVN } from "./api.js";
import { magSq } from "./magsq.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";

/**
 * Limits `v` to max length `n` and writes result to `out` (or to itself if
 * `out` is null).
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const limit: VecOpVN = (out, v, n) => {
	!out && (out = v);
	const m = magSq(v);
	return m > n * n
		? mulN(out, v, n / Math.sqrt(m))
		: out !== v
		? set(out, v)
		: out;
};
