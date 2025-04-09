import type { MultiVecOpVN } from "./api.js";
import { modN as $modN } from "@thi.ng/vec-nd/modn";
import { modN2 } from "@thi.ng/vec2/modn";
import { modN3 } from "@thi.ng/vec3/modn";
import { modN4 } from "@thi.ng/vec4/modn";
import { vop } from "./vop.js";

/**
 * Same as {@link mod}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN: MultiVecOpVN = vop(1);
modN.default($modN)
modN.add(2, modN2);
modN.add(3, modN3);
modN.add(4, modN4);