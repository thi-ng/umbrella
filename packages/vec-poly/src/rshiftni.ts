import type { MultiVecOpVN } from "./api.js";
import { rshiftNI as $rshiftNI } from "@thi.ng/vec-nd/rshiftni";
import { rshiftNI2 } from "@thi.ng/vec2/rshiftni";
import { rshiftNI3 } from "@thi.ng/vec3/rshiftni";
import { rshiftNI4 } from "@thi.ng/vec4/rshiftni";
import { vop } from "./vop.js";

/**
 * Componentwise binary right shift of given nD signed integer vector by
 * uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNI: MultiVecOpVN = vop(1);
rshiftNI.default($rshiftNI)
rshiftNI.add(2, rshiftNI2);
rshiftNI.add(3, rshiftNI3);
rshiftNI.add(4, rshiftNI4);