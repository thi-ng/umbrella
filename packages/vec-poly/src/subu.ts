import type { MultiVecOpVV } from "./api.js";
import { subU as $subU } from "@thi.ng/vec-nd/subu";
import { subU2 } from "@thi.ng/vec2/subu";
import { subU3 } from "@thi.ng/vec3/subu";
import { subU4 } from "@thi.ng/vec4/subu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector subtraction.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subU: MultiVecOpVV = vop(1);
subU.default($subU)
subU.add(2, subU2);
subU.add(3, subU3);
subU.add(4, subU4);