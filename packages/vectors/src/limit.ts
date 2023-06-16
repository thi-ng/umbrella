import type { VecOpVN } from "./api.js";
import { magSq, magSq2, magSq3, magSq4 } from "./magsq.js";
import { mulN, mulN2, mulN3, mulN4 } from "./muln.js";
import { set, set2, set3, set4 } from "./set.js";

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

export const limit2: VecOpVN = (out, v, n) => {
	!out && (out = v);
	const m = magSq2(v);
	return m > n * n
		? mulN2(out, v, n / Math.sqrt(m))
		: out !== v
		? set2(out, v)
		: out;
};

export const limit3: VecOpVN = (out, v, n) => {
	!out && (out = v);
	const m = magSq3(v);
	return m > n * n
		? mulN3(out, v, n / Math.sqrt(m))
		: out !== v
		? set3(out, v)
		: out;
};

export const limit4: VecOpVN = (out, v, n) => {
	!out && (out = v);
	const m = magSq4(v);
	return m > n * n
		? mulN4(out, v, n / Math.sqrt(m))
		: out !== v
		? set4(out, v)
		: out;
};
