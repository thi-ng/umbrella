import type { IRandom } from "@thi.ng/random";
import type { VecOpOO } from "@thi.ng/vec-api";
import { normalize2 } from "./normalize.js";
import { random2 } from "./random.js";

/**
 * Sets `v` to a random vector (using {@link random2}), normalized to length `n`
 * (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html), i.e.
 * `Math.random`.
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm2: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize2(null, random2(v, -1, 1, rnd), n);
