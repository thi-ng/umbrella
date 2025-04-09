import type { MultiVecOpVN } from "./api.js";
import { addNU as $addNU } from "@thi.ng/vec-nd/addnu";
import { addNU2 } from "@thi.ng/vec2/addnu";
import { addNU3 } from "@thi.ng/vec3/addnu";
import { addNU4 } from "@thi.ng/vec4/addnu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector addition with uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNU: MultiVecOpVN = vop(1);
addNU.default($addNU)
addNU.add(2, addNU2);
addNU.add(3, addNU3);
addNU.add(4, addNU4);