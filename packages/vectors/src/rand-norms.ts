// SPDX-License-Identifier: Apache-2.0
import type { IRandom } from "@thi.ng/random";
import type { VecOpSGOO, VecOpSOO, VecOpSOOO, VecOpSVO } from "./api.js";
import {
	normalizeS,
	normalizeS2,
	normalizeS3,
	normalizeS4,
} from "./normalizes.js";
import { randomS, randomS2, randomS3, randomS4 } from "./randoms.js";

/**
 * Sets `v` to a random nD vector (using {@link randomS}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param size -
 * @param n -
 * @param rnd -
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randNormS: VecOpSGOO<number, IRandom> = (
	v,
	size,
	n = 1,
	rnd,
	ia = 0,
	sa = 1
) =>
	normalizeS(
		v,
		randomS(v, size, -1, 1, rnd, ia, sa),
		size,
		n,
		ia,
		ia,
		sa,
		sa
	);

const $ =
	(
		normalize: VecOpSVO<number>,
		random: VecOpSOOO<number, number, IRandom>
	): VecOpSOO<number, IRandom> =>
	(a, n = 1, rnd?, ia = 0, sa = 1) =>
		normalize(null, random(a, -1, 1, rnd, ia, sa), n, ia, ia, sa, sa);

/**
 * Sets `v` to a random 2D vector (using {@link randomS2}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randNormS2 = $(normalizeS2, randomS2);

/**
 * Sets `v` to a random 3D vector (using {@link randomS3}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randNormS3 = $(normalizeS3, randomS3);

/**
 * Sets `v` to a random 4D vector (using {@link randomS4}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randNormS4 = $(normalizeS4, randomS4);
