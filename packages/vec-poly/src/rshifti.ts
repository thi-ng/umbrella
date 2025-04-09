import type { MultiVecOpVV } from "./api.js";
import { rshiftI as $rshiftI } from "@thi.ng/vec-nd/rshifti";
import { rshiftI2 } from "@thi.ng/vec2/rshifti";
import { rshiftI3 } from "@thi.ng/vec3/rshifti";
import { rshiftI4 } from "@thi.ng/vec4/rshifti";
import { vop } from "./vop.js";

/**
 * Componentwise binary right shift of given nD signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftI: MultiVecOpVV = vop(1);
rshiftI.default($rshiftI)
rshiftI.add(2, rshiftI2);
rshiftI.add(3, rshiftI3);
rshiftI.add(4, rshiftI4);