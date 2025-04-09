// SPDX-License-Identifier: Apache-2.0
import type { IRandom } from "@thi.ng/random";
import type { VecOpOO } from "./api.js";
import { normalize, normalize2, normalize3, normalize4 } from "./normalize.js";
import { random, random2, random3, random4 } from "./random.js";

/**
 * Sets `v` to a random vector (using {@link random}), normalized to length `n`
 * (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html), i.e.
 * `Math.random`.
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and initialized to the desired size/length.
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize(null, random(v, -1, 1, rnd), n);

export const randNorm2: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize2(null, random2(v, -1, 1, rnd), n);

export const randNorm3: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize3(null, random3(v, -1, 1, rnd), n);

export const randNorm4: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize4(null, random4(v, -1, 1, rnd), n);
