import type { MultiVecOpVN } from "./api.js";
import { mulN as $mulN } from "@thi.ng/vec-nd/muln";
import { mulN2 } from "@thi.ng/vec2/muln";
import { mulN3 } from "@thi.ng/vec3/muln";
import { mulN4 } from "@thi.ng/vec4/muln";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector multiplication with a uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulN: MultiVecOpVN = vop(1);
mulN.default($mulN)
mulN.add(2, mulN2);
mulN.add(3, mulN3);
mulN.add(4, mulN4);