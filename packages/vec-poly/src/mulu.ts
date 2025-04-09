import type { MultiVecOpVV } from "./api.js";
import { mulU as $mulU } from "@thi.ng/vec-nd/mulu";
import { mulU2 } from "@thi.ng/vec2/mulu";
import { mulU3 } from "@thi.ng/vec3/mulu";
import { mulU4 } from "@thi.ng/vec4/mulu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector multiplication.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulU: MultiVecOpVV = vop(1);
mulU.default($mulU)
mulU.add(2, mulU2);
mulU.add(3, mulU3);
mulU.add(4, mulU4);