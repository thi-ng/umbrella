import type { IRandom } from "@thi.ng/random";
import type { VecOpOO } from "@thi.ng/vec-api";
import { normalize3 } from "./normalize.js";
import { random3 } from "./random.js";

/**
 * Sets `v` to a random vector (using {@link random3}), normalized to length `n`
 * (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm3: VecOpOO<number, IRandom> = (v, n = 1, rnd) =>
	normalize3(null, random3(v, -1, 1, rnd), n);
