import type { MultiVecOpVN } from "./api.js";
import { subNU as $subNU } from "@thi.ng/vec-nd/subnu";
import { subNU2 } from "@thi.ng/vec2/subnu";
import { subNU3 } from "@thi.ng/vec3/subnu";
import { subNU4 } from "@thi.ng/vec4/subnu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector subtraction with uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNU: MultiVecOpVN = vop(1);
subNU.default($subNU)
subNU.add(2, subNU2);
subNU.add(3, subNU3);
subNU.add(4, subNU4);