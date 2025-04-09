import type { MultiVecOpV } from "./api.js";
import { cos as $cos } from "@thi.ng/vec-nd/cos";
import { cos2 } from "@thi.ng/vec2/cos";
import { cos3 } from "@thi.ng/vec3/cos";
import { cos4 } from "@thi.ng/vec4/cos";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.cos` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos: MultiVecOpV = vop(1);
cos.default($cos)
cos.add(2, cos2);
cos.add(3, cos3);
cos.add(4, cos4);