import type { VecOpNFO } from "@thi.ng/vec-api";
import { normalize3 } from "./normalize.js";
import { randDistrib3 } from "./rand-distrib.js";

/**
 * Similar to {@link randNorm3} but wraps {@link randDistrib3} which draws
 * samples from given distribution function (default: gaussian/normal
 * distribution).
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and pre-initialized to the desired size/length.
 *
 * @param v -
 * @param n -
 * @param distrib -
 */
export const randNormDistrib3: VecOpNFO = (v, n = 1, distrib) =>
	normalize3(null, randDistrib3(v, distrib), n);
