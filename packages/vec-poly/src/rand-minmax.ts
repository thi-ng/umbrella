import type { IRandom } from "@thi.ng/random";
import { randMinMax as $randMinMax } from "@thi.ng/vec-nd/rand-minmax";
import { randMinMax2 } from "@thi.ng/vec2/rand-minmax";
import { randMinMax3 } from "@thi.ng/vec3/rand-minmax";
import { randMinMax4 } from "@thi.ng/vec4/rand-minmax";
import type { MultiVecOpVVO } from "./api.js";
import { vop } from "./vop.js";

/**
 *
 *
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMax: MultiVecOpVVO<IRandom> = vop(1);
randMinMax.default($randMinMax);
randMinMax.add(2, randMinMax2);
randMinMax.add(3, randMinMax3);
randMinMax.add(4, randMinMax4);
