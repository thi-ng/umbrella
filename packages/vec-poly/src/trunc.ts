import type { MultiVecOpV } from "./api.js";
import { trunc as $trunc } from "@thi.ng/vec-nd/trunc";
import { trunc2 } from "@thi.ng/vec2/trunc";
import { trunc3 } from "@thi.ng/vec3/trunc";
import { trunc4 } from "@thi.ng/vec4/trunc";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.trunc` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc: MultiVecOpV = vop(1);
trunc.default($trunc)
trunc.add(2, trunc2);
trunc.add(3, trunc3);
trunc.add(4, trunc4);