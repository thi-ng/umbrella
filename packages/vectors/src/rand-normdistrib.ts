// SPDX-License-Identifier: Apache-2.0
import type { VecOpNFO } from "./api.js";
import { normalize, normalize2, normalize3, normalize4 } from "./normalize.js";
import {
	randDistrib,
	randDistrib2,
	randDistrib3,
	randDistrib4,
} from "./rand-distrib.js";

/**
 * Similar to {@link randNorm} but wraps {@link randDistrib} which draws samples
 * from given distribution function (default: gaussian/normal distribution).
 *
 * @remarks
 * This version of this function can ONLY be used if `v` is given and
 * pre-initialized to the desired size/length.
 *
 * @param v -
 * @param n -
 * @param distrib -
 */
export const randNormDistrib: VecOpNFO = (v, n = 1, distrib) =>
	normalize(null, randDistrib(v, distrib), n);

/**
 * Similar to {@link randNorm2} but wraps {@link randDistrib2} which draws
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

/**
 * Similar to {@link randNorm4} but wraps {@link randDistrib4} which draws
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
export const randNormDistrib4: VecOpNFO = (v, n = 1, distrib) =>
	normalize4(null, randDistrib4(v, distrib), n);
