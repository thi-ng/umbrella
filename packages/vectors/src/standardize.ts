import type { ReadonlyVec, Vec } from "./api.js";
import { center } from "./center.js";
import { magSq } from "./magsq.js";
import { mulN } from "./muln.js";

/**
 * Returns standardized version of `a`, i.e. `a' / sd(a')`, where `a'` is the
 * {@link center}'ed version of `a`.
 *
 * @remarks
 * If `mag(a')` is zero, the returned vector will have all components
 * zero-valued too.
 *
 * @param out
 * @param a
 */
export const standardize = (out: Vec | null, a: ReadonlyVec) => {
    out = center(out, a);
    const m = magSq(out);
    return m > 0 ? mulN(null, out, 1 / Math.sqrt(m / (out.length - 1))) : out;
};
