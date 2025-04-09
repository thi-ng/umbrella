import type { MultiVecOpVN } from "./api.js";
import { addNI as $addNI } from "@thi.ng/vec-nd/addni";
import { addNI2 } from "@thi.ng/vec2/addni";
import { addNI3 } from "@thi.ng/vec3/addni";
import { addNI4 } from "@thi.ng/vec4/addni";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector addition with uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNI: MultiVecOpVN = vop(1);
addNI.default($addNI)
addNI.add(2, addNI2);
addNI.add(3, addNI3);
addNI.add(4, addNI4);