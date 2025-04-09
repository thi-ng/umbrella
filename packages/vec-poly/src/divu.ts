import type { MultiVecOpVV } from "./api.js";
import { divU as $divU } from "@thi.ng/vec-nd/divu";
import { divU2 } from "@thi.ng/vec2/divu";
import { divU3 } from "@thi.ng/vec3/divu";
import { divU4 } from "@thi.ng/vec4/divu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector division.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divU: MultiVecOpVV = vop(1);
divU.default($divU)
divU.add(2, divU2);
divU.add(3, divU3);
divU.add(4, divU4);