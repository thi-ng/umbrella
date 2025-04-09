import type { MultiVecOpV } from "./api.js";
import { sqrt as $sqrt } from "@thi.ng/vec-nd/sqrt";
import { sqrt2 } from "@thi.ng/vec2/sqrt";
import { sqrt3 } from "@thi.ng/vec3/sqrt";
import { sqrt4 } from "@thi.ng/vec4/sqrt";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.sqrt` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt: MultiVecOpV = vop(1);
sqrt.default($sqrt)
sqrt.add(2, sqrt2);
sqrt.add(3, sqrt3);
sqrt.add(4, sqrt4);