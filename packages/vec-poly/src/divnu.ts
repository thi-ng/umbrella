import type { MultiVecOpVN } from "./api.js";
import { divNU as $divNU } from "@thi.ng/vec-nd/divnu";
import { divNU2 } from "@thi.ng/vec2/divnu";
import { divNU3 } from "@thi.ng/vec3/divnu";
import { divNU4 } from "@thi.ng/vec4/divnu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector division with a uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNU: MultiVecOpVN = vop(1);
divNU.default($divNU)
divNU.add(2, divNU2);
divNU.add(3, divNU3);
divNU.add(4, divNU4);