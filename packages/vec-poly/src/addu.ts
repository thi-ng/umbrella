import type { MultiVecOpVV } from "./api.js";
import { addU as $addU } from "@thi.ng/vec-nd/addu";
import { addU2 } from "@thi.ng/vec2/addu";
import { addU3 } from "@thi.ng/vec3/addu";
import { addU4 } from "@thi.ng/vec4/addu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector addition.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addU: MultiVecOpVV = vop(1);
addU.default($addU)
addU.add(2, addU2);
addU.add(3, addU3);
addU.add(4, addU4);