import type { MultiVecOpVV } from "./api.js";
import { min as $min } from "@thi.ng/vec-nd/min";
import { min2 } from "@thi.ng/vec2/min";
import { min3 } from "@thi.ng/vec3/min";
import { min4 } from "@thi.ng/vec4/min";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.min` of given nD vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min: MultiVecOpVV = vop(1);
min.default($min)
min.add(2, min2);
min.add(3, min3);
min.add(4, min4);