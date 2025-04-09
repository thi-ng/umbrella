import type { MultiVecOpV } from "./api.js";
import { tan as $tan } from "@thi.ng/vec-nd/tan";
import { tan2 } from "@thi.ng/vec2/tan";
import { tan3 } from "@thi.ng/vec3/tan";
import { tan4 } from "@thi.ng/vec4/tan";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.tan` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan: MultiVecOpV = vop(1);
tan.default($tan)
tan.add(2, tan2);
tan.add(3, tan3);
tan.add(4, tan4);