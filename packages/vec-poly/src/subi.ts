import type { MultiVecOpVV } from "./api.js";
import { subI as $subI } from "@thi.ng/vec-nd/subi";
import { subI2 } from "@thi.ng/vec2/subi";
import { subI3 } from "@thi.ng/vec3/subi";
import { subI4 } from "@thi.ng/vec4/subi";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector subtraction.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subI: MultiVecOpVV = vop(1);
subI.default($subI)
subI.add(2, subI2);
subI.add(3, subI3);
subI.add(4, subI4);