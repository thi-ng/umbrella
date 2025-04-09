import type { MultiVecOpVN } from "./api.js";
import { remainderN as $remainderN } from "@thi.ng/vec-nd/remaindern";
import { remainderN2 } from "@thi.ng/vec2/remaindern";
import { remainderN3 } from "@thi.ng/vec3/remaindern";
import { remainderN4 } from "@thi.ng/vec4/remaindern";
import { vop } from "./vop.js";

/**
 * Same as {@link remainder}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN: MultiVecOpVN = vop(1);
remainderN.default($remainderN)
remainderN.add(2, remainderN2);
remainderN.add(3, remainderN3);
remainderN.add(4, remainderN4);