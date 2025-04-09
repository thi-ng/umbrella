import type { MultiVecOpVVV } from "./api.js";
import { addm as $addm } from "@thi.ng/vec-nd/addm";
import { addm2 } from "@thi.ng/vec2/addm";
import { addm3 } from "@thi.ng/vec3/addm";
import { addm4 } from "@thi.ng/vec4/addm";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector add-multiply.
 * `o = (a + b) * c`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const addm: MultiVecOpVVV = vop(1);
addm.default($addm)
addm.add(2, addm2);
addm.add(3, addm3);
addm.add(4, addm4);