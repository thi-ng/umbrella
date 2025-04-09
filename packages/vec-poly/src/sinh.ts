import type { MultiVecOpV } from "./api.js";
import { sinh as $sinh } from "@thi.ng/vec-nd/sinh";
import { sinh2 } from "@thi.ng/vec2/sinh";
import { sinh3 } from "@thi.ng/vec3/sinh";
import { sinh4 } from "@thi.ng/vec4/sinh";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.sinh` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh: MultiVecOpV = vop(1);
sinh.default($sinh)
sinh.add(2, sinh2);
sinh.add(3, sinh3);
sinh.add(4, sinh4);