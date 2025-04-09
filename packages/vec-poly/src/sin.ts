import type { MultiVecOpV } from "./api.js";
import { sin as $sin } from "@thi.ng/vec-nd/sin";
import { sin2 } from "@thi.ng/vec2/sin";
import { sin3 } from "@thi.ng/vec3/sin";
import { sin4 } from "@thi.ng/vec4/sin";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.sin` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin: MultiVecOpV = vop(1);
sin.default($sin)
sin.add(2, sin2);
sin.add(3, sin3);
sin.add(4, sin4);