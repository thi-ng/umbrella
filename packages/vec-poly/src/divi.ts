import type { MultiVecOpVV } from "./api.js";
import { divI as $divI } from "@thi.ng/vec-nd/divi";
import { divI2 } from "@thi.ng/vec2/divi";
import { divI3 } from "@thi.ng/vec3/divi";
import { divI4 } from "@thi.ng/vec4/divi";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector division.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI: MultiVecOpVV = vop(1);
divI.default($divI)
divI.add(2, divI2);
divI.add(3, divI3);
divI.add(4, divI4);