import type { MultiVecOpV } from "./api.js";
import { exp as $exp } from "@thi.ng/vec-nd/exp";
import { exp2 } from "@thi.ng/vec2/exp";
import { exp3 } from "@thi.ng/vec3/exp";
import { exp4 } from "@thi.ng/vec4/exp";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.exp` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp: MultiVecOpV = vop(1);
exp.default($exp)
exp.add(2, exp2);
exp.add(3, exp3);
exp.add(4, exp4);