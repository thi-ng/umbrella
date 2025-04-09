import type { MultiVecOpVN } from "./api.js";
import { mulNI as $mulNI } from "@thi.ng/vec-nd/mulni";
import { mulNI2 } from "@thi.ng/vec2/mulni";
import { mulNI3 } from "@thi.ng/vec3/mulni";
import { mulNI4 } from "@thi.ng/vec4/mulni";
import { vop } from "./vop.js";

/**
 * Componentwise nD signed integer vector multiplication with uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNI: MultiVecOpVN = vop(1);
mulNI.default($mulNI)
mulNI.add(2, mulNI2);
mulNI.add(3, mulNI3);
mulNI.add(4, mulNI4);