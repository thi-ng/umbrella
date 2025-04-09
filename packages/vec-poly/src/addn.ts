import type { MultiVecOpVN } from "./api.js";
import { addN as $addN } from "@thi.ng/vec-nd/addn";
import { addN2 } from "@thi.ng/vec2/addn";
import { addN3 } from "@thi.ng/vec3/addn";
import { addN4 } from "@thi.ng/vec4/addn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector addition with a uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN: MultiVecOpVN = vop(1);
addN.default($addN)
addN.add(2, addN2);
addN.add(3, addN3);
addN.add(4, addN4);