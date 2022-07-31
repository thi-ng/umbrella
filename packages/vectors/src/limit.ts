import type { VecOpVN } from "./api.js";
import { mag } from "./mag.js";
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
	const m = mag(v);
	return m > n ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
};
