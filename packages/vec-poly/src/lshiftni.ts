import type { MultiVecOpVN } from "./api.js";
import { lshiftNI as $lshiftNI } from "@thi.ng/vec-nd/lshiftni";
import { lshiftNI2 } from "@thi.ng/vec2/lshiftni";
import { lshiftNI3 } from "@thi.ng/vec3/lshiftni";
import { lshiftNI4 } from "@thi.ng/vec4/lshiftni";
import { vop } from "./vop.js";

/**
 * Componentwise binary left shift of given nD signed integer vector by uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNI: MultiVecOpVN = vop(1);
lshiftNI.default($lshiftNI)
lshiftNI.add(2, lshiftNI2);
lshiftNI.add(3, lshiftNI3);
lshiftNI.add(4, lshiftNI4);