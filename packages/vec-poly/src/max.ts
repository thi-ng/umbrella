import type { MultiVecOpVV } from "./api.js";
import { max as $max } from "@thi.ng/vec-nd/max";
import { max2 } from "@thi.ng/vec2/max";
import { max3 } from "@thi.ng/vec3/max";
import { max4 } from "@thi.ng/vec4/max";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.max` of given nD vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max: MultiVecOpVV = vop(1);
max.default($max)
max.add(2, max2);
max.add(3, max3);
max.add(4, max4);