import type { MultiVecOpVN } from "./api.js";
import { mulNU as $mulNU } from "@thi.ng/vec-nd/mulnu";
import { mulNU2 } from "@thi.ng/vec2/mulnu";
import { mulNU3 } from "@thi.ng/vec3/mulnu";
import { mulNU4 } from "@thi.ng/vec4/mulnu";
import { vop } from "./vop.js";

/**
 * Componentwise nD unsigned integer vector multiplication with uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNU: MultiVecOpVN = vop(1);
mulNU.default($mulNU)
mulNU.add(2, mulNU2);
mulNU.add(3, mulNU3);
mulNU.add(4, mulNU4);