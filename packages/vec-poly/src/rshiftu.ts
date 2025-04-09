import type { MultiVecOpVV } from "./api.js";
import { rshiftU as $rshiftU } from "@thi.ng/vec-nd/rshiftu";
import { rshiftU2 } from "@thi.ng/vec2/rshiftu";
import { rshiftU3 } from "@thi.ng/vec3/rshiftu";
import { rshiftU4 } from "@thi.ng/vec4/rshiftu";
import { vop } from "./vop.js";

/**
 * Componentwise binary right shift of given nD unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftU: MultiVecOpVV = vop(1);
rshiftU.default($rshiftU)
rshiftU.add(2, rshiftU2);
rshiftU.add(3, rshiftU3);
rshiftU.add(4, rshiftU4);