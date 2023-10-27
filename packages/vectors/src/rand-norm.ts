import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { Vec, VecOpOOO } from "./api.js";
import { normalize } from "./normalize.js";
import { random, random2, random3, random4 } from "./random.js";

const $norm =
	(random: VecOpOOO<number, number, IRandom>) =>
	(v: Vec | null, n = 1, rnd: IRandom = SYSTEM) =>
		normalize(null, random(v, -1, 1, rnd), n);

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
export const randNorm = $norm(random);
export const randNorm2 = $norm(random2);
export const randNorm3 = $norm(random3);
export const randNorm4 = $norm(random4);
