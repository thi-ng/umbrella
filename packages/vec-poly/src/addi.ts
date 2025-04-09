import type { MultiVecOpVV } from "./api.js";
import { addI as $addI } from "@thi.ng/vec-nd/addi";
import { addI2 } from "@thi.ng/vec2/addi";
import { addI3 } from "@thi.ng/vec3/addi";
import { addI4 } from "@thi.ng/vec4/addi";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector addition.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addI: MultiVecOpVV = vop(1);
addI.default($addI)
addI.add(2, addI2);
addI.add(3, addI3);
addI.add(4, addI4);