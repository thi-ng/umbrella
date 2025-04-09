import type { MultiVecOpVV } from "./api.js";
import { pow as $pow } from "@thi.ng/vec-nd/pow";
import { pow2 } from "@thi.ng/vec2/pow";
import { pow3 } from "@thi.ng/vec3/pow";
import { pow4 } from "@thi.ng/vec4/pow";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.pow` of given nD vector `a`. Vector `b` contains
 * exponents.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow: MultiVecOpVV = vop(1);
pow.default($pow)
pow.add(2, pow2);
pow.add(3, pow3);
pow.add(4, pow4);