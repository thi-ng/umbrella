import type { IRandom } from "@thi.ng/random";
import type { VecOpOO } from "./api.js";
import { normalize, normalize2, normalize3, normalize4 } from "./normalize.js";
import { random, random2, random3, random4 } from "./random.js";

/**
 * Sets `v` to a random nD vector (using {@link random2}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize(null, random(v, -1, 1, rnd), n);

/**
 * Sets `v` to a random 2D vector (using {@link random2}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm2: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize2(null, random2(v, -1, 1, rnd), n);

/**
 * Sets `v` to a random 3D vector (using {@link random2}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm3: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize3(null, random3(v, -1, 1, rnd), n);

/**
 * Sets `v` to a random 4D vector (using {@link random2}), normalized to length
 * `n` (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm4: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize4(null, random4(v, -1, 1, rnd), n);
