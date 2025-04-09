import type { MultiVecOpV } from "./api.js";
import { exp_2 as $exp_2 } from "@thi.ng/vec-nd/exp2";
import { exp_22 } from "@thi.ng/vec2/exp2";
import { exp_23 } from "@thi.ng/vec3/exp2";
import { exp_24 } from "@thi.ng/vec4/exp2";
import { vop } from "./vop.js";

/**
 * Componentwise computes `2^x` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp_2: MultiVecOpV = vop(1);
exp_2.default($exp_2)
exp_2.add(2, exp_22);
exp_2.add(3, exp_23);
exp_2.add(4, exp_24);