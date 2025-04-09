import type { MultiVecOpVN } from "./api.js";
import { powN as $powN } from "@thi.ng/vec-nd/pown";
import { powN2 } from "@thi.ng/vec2/pown";
import { powN3 } from "@thi.ng/vec3/pown";
import { powN4 } from "@thi.ng/vec4/pown";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.pow` of given nD vector and uniform scalar exponent.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN: MultiVecOpVN = vop(1);
powN.default($powN)
powN.add(2, powN2);
powN.add(3, powN3);
powN.add(4, powN4);