import type { ReadonlyVec, Vec } from "./api.js";
import { vmean } from "./mean.js";
import { subN } from "./subn.js";

/**
 * Creates a mean-centered version of `a`, i.e. subtracts {@link vmean} of `a`
 * from each component and writes result to `out` (or back into `a` iff `out` is
 * null).
 *
 * @param out -
 * @param a -
 */
export const center = (out: Vec | null, a: ReadonlyVec) =>
	subN(out, a, vmean(a));
