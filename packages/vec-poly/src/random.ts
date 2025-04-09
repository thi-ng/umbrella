import type { IRandom } from "@thi.ng/random";
import { random as $random } from "@thi.ng/vec-nd/random";
import { random2 } from "@thi.ng/vec2/random";
import { random3 } from "@thi.ng/vec3/random";
import { random4 } from "@thi.ng/vec4/random";
import type { MultiVecOpOOO } from "./api.js";
import { vop } from "./vop.js";

/**
 * Sets `a` to random vector, with each component in the semi-open interval
 * `[b,c)`. If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 * Creates new vector if `a` is null.
 *
 * **IMPORTANT:** The non-fixed sized version of this function can ONLY be used
 * if `a` is given and initialized to the desired size/length.
 *
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param a - vector
 * @param b - scalar (min. bounds, default: -1)
 * @param c - scalar (max. bounds, default: 1)
 * @param rnd - PRNG instance
 */
export const random: MultiVecOpOOO<number, number, IRandom> = vop(0);
random.default($random);
random.add(2, random2);
random.add(3, random3);
random.add(4, random4);
