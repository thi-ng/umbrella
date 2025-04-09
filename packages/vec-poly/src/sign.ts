import type { MultiVecOpV } from "./api.js";
import { sign as $sign } from "@thi.ng/vec-nd/sign";
import { sign2 } from "@thi.ng/vec2/sign";
import { sign3 } from "@thi.ng/vec3/sign";
import { sign4 } from "@thi.ng/vec4/sign";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.sign` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign: MultiVecOpV = vop(1);
sign.default($sign)
sign.add(2, sign2);
sign.add(3, sign3);
sign.add(4, sign4);