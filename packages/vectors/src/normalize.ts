import { EPS } from "@thi.ng/math/api";
import type { VecOpVO } from "./api.js";
import { mag } from "./mag.js";
import { magSq2, magSq3, magSq4 } from "./magsq.js";
import { mulN, mulN2, mulN3, mulN4 } from "./muln.js";
import { set, set2, set3, set4 } from "./set.js";

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalize: VecOpVO<number> = (out, v, n = 1) => {
	!out && (out = v);
	const m = mag(v);
	return m >= EPS ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
};

/**
 * Optimized 2d version of generic {@link normalize}.
 * @param out
 * @param v
 * @param n
 */
export const normalize2: VecOpVO<number> = (out, v, n = 1) => {
	!out && (out = v);
	const m = Math.sqrt(magSq2(v));
	return m >= EPS ? mulN2(out, v, n / m) : out !== v ? set2(out, v) : out;
};

/**
 * Optimized 3d version of generic {@link normalize}.
 * @param out
 * @param v
 * @param n
 */
export const normalize3: VecOpVO<number> = (out, v, n = 1) => {
	!out && (out = v);
	const m = Math.sqrt(magSq3(v));
	return m >= EPS ? mulN3(out, v, n / m) : out !== v ? set3(out, v) : out;
};

/**
 * Optimized 4d version of generic {@link normalize}.
 * @param out
 * @param v
 * @param n
 */
export const normalize4: VecOpVO<number> = (out, v, n = 1) => {
	!out && (out = v);
	const m = Math.sqrt(magSq4(v));
	return m >= EPS ? mulN4(out, v, n / m) : out !== v ? set4(out, v) : out;
};
