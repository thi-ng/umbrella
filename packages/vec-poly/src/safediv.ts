import type { MultiVecOpVV } from "./api.js";
import { safeDiv as $safeDiv } from "@thi.ng/vec-nd/safediv";
import { safeDiv2 } from "@thi.ng/vec2/safediv";
import { safeDiv3 } from "@thi.ng/vec3/safediv";
import { safeDiv4 } from "@thi.ng/vec4/safediv";
import { vop } from "./vop.js";

/**
 * Componentwise divides given nD vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv: MultiVecOpVV = vop(1);
safeDiv.default($safeDiv)
safeDiv.add(2, safeDiv2);
safeDiv.add(3, safeDiv3);
safeDiv.add(4, safeDiv4);