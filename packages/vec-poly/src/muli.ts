import type { MultiVecOpVV } from "./api.js";
import { mulI as $mulI } from "@thi.ng/vec-nd/muli";
import { mulI2 } from "@thi.ng/vec2/muli";
import { mulI3 } from "@thi.ng/vec3/muli";
import { mulI4 } from "@thi.ng/vec4/muli";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector multiplication.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI: MultiVecOpVV = vop(1);
mulI.default($mulI)
mulI.add(2, mulI2);
mulI.add(3, mulI3);
mulI.add(4, mulI4);