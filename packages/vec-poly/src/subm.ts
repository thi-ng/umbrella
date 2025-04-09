import type { MultiVecOpVVV } from "./api.js";
import { subm as $subm } from "@thi.ng/vec-nd/subm";
import { subm2 } from "@thi.ng/vec2/subm";
import { subm3 } from "@thi.ng/vec3/subm";
import { subm4 } from "@thi.ng/vec4/subm";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector subtract-multiply.
 * `o = (a - b) * c`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const subm: MultiVecOpVVV = vop(1);
subm.default($subm)
subm.add(2, subm2);
subm.add(3, subm3);
subm.add(4, subm4);