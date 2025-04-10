import type { VecOpNFO } from "@thi.ng/vec-api";
import { normalize2 } from "./normalize.js";
import { randDistrib2 } from "./rand-distrib.js";

/**
 * Similar to {@link randNorm} but wraps {@link randDistrib} which draws
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
export const randNormDistrib2: VecOpNFO = (v, n = 1, distrib) =>
	normalize2(null, randDistrib2(v, distrib), n);
