import type { MultiVecOpVN } from "./api.js";
import { divNI as $divNI } from "@thi.ng/vec-nd/divni";
import { divNI2 } from "@thi.ng/vec2/divni";
import { divNI3 } from "@thi.ng/vec3/divni";
import { divNI4 } from "@thi.ng/vec4/divni";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector division with a uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNI: MultiVecOpVN = vop(1);
divNI.default($divNI)
divNI.add(2, divNI2);
divNI.add(3, divNI3);
divNI.add(4, divNI4);