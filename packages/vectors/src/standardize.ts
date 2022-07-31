import type { ReadonlyVec, Vec } from "./api.js";
import { center } from "./center.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";
import { sd } from "./variance.js";

/**
 * Returns standardized version of `a`, i.e. `a' / sd(a')`, where `a'` is the
 * {@link center}'ed version of `a`. If `isCentered` is false (default), the
 * vector will first be centered in order to compute the result.
 *
 * @remarks
 * If `mag(a')` is zero, the returned vector will have all components
 * zero-valued too.
 *
 * @param out -
 * @param a -
 * @param isCentered -
 */
export const standardize = (
	out: Vec | null,
	a: ReadonlyVec,
	isCentered = false
) => {
	out = !isCentered ? center(out, a) : !out ? a : set(out, a);
	const d = sd(out, true);
	return d > 0 ? mulN(null, out, 1 / d) : out;
};
