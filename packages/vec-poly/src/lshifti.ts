import type { MultiVecOpVV } from "./api.js";
import { lshiftI as $lshiftI } from "@thi.ng/vec-nd/lshifti";
import { lshiftI2 } from "@thi.ng/vec2/lshifti";
import { lshiftI3 } from "@thi.ng/vec3/lshifti";
import { lshiftI4 } from "@thi.ng/vec4/lshifti";
import { vop } from "./vop.js";

/**
 * Componentwise binary left shift of given nD signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftI: MultiVecOpVV = vop(1);
lshiftI.default($lshiftI)
lshiftI.add(2, lshiftI2);
lshiftI.add(3, lshiftI3);
lshiftI.add(4, lshiftI4);