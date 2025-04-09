import type { MultiVecOpVNV } from "./api.js";
import { maddN as $maddN } from "@thi.ng/vec-nd/maddn";
import { maddN2 } from "@thi.ng/vec2/maddn";
import { maddN3 } from "@thi.ng/vec3/maddn";
import { maddN4 } from "@thi.ng/vec4/maddn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN: MultiVecOpVNV = vop(1);
maddN.default($maddN)
maddN.add(2, maddN2);
maddN.add(3, maddN3);
maddN.add(4, maddN4);