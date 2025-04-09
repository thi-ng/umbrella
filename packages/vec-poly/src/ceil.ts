import type { MultiVecOpV } from "./api.js";
import { ceil as $ceil } from "@thi.ng/vec-nd/ceil";
import { ceil2 } from "@thi.ng/vec2/ceil";
import { ceil3 } from "@thi.ng/vec3/ceil";
import { ceil4 } from "@thi.ng/vec4/ceil";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.ceil` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil: MultiVecOpV = vop(1);
ceil.default($ceil)
ceil.add(2, ceil2);
ceil.add(3, ceil3);
ceil.add(4, ceil4);