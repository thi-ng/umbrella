import type { VecOpFNO, VecOpNFO } from "./api.js";
import { normalize } from "./normalize.js";
import {
	randDistrib,
	randDistrib2,
	randDistrib3,
	randDistrib4,
} from "./rand-distrib.js";

const $normDist =
	(random: VecOpFNO): VecOpNFO =>
	(v, n = 1, rnd) =>
		normalize(null, random(v, rnd), n);

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
 * @param distribFn -
 */
export const randNormDistrib = $normDist(randDistrib);
export const randNormDistrib2 = $normDist(randDistrib2);
export const randNormDistrib3 = $normDist(randDistrib3);
export const randNormDistrib4 = $normDist(randDistrib4);
