import type { MultiVecOpVVN } from "./api.js";
import { addmN as $addmN } from "@thi.ng/vec-nd/addmn";
import { addmN2 } from "@thi.ng/vec2/addmn";
import { addmN3 } from "@thi.ng/vec3/addmn";
import { addmN4 } from "@thi.ng/vec4/addmn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector add-multiply.
 * `o = (a + b) * n`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN: MultiVecOpVVN = vop(1);
addmN.default($addmN)
addmN.add(2, addmN2);
addmN.add(3, addmN3);
addmN.add(4, addmN4);