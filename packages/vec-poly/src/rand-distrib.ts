import type { MultiVecOpFNO } from "./api.js";
import { randDistrib as $randDistrib } from "@thi.ng/vec-nd/rand-distrib";
import { randDistrib2 } from "@thi.ng/vec2/rand-distrib";
import { randDistrib3 } from "@thi.ng/vec3/rand-distrib";
import { randDistrib4 } from "@thi.ng/vec4/rand-distrib";
import { vop } from "./vop.js";

/**
 * Sets `v` to random vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 * 
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is
 * given and initialized to the desired size/length.
 * 
 * References:
 * 
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib: MultiVecOpFNO = vop(1);
randDistrib.default($randDistrib)
randDistrib.add(2, randDistrib2);
randDistrib.add(3, randDistrib3);
randDistrib.add(4, randDistrib4);