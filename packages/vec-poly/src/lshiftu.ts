import type { MultiVecOpVV } from "./api.js";
import { lshiftU as $lshiftU } from "@thi.ng/vec-nd/lshiftu";
import { lshiftU2 } from "@thi.ng/vec2/lshiftu";
import { lshiftU3 } from "@thi.ng/vec3/lshiftu";
import { lshiftU4 } from "@thi.ng/vec4/lshiftu";
import { vop } from "./vop.js";

/**
 * Componentwise binary left shift of given nD unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftU: MultiVecOpVV = vop(1);
lshiftU.default($lshiftU)
lshiftU.add(2, lshiftU2);
lshiftU.add(3, lshiftU3);
lshiftU.add(4, lshiftU4);