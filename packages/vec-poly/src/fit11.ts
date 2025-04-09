import type { MultiVecOpVVV } from "./api.js";
import { fit11 as $fit11 } from "@thi.ng/vec-nd/fit11";
import { fit11_2 } from "@thi.ng/vec2/fit11";
import { fit11_3 } from "@thi.ng/vec3/fit11";
import { fit11_4 } from "@thi.ng/vec4/fit11";
import { vop } from "./vop.js";

/**
 * Componentwise maps given nD vector `a` from the closed `[-1,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit11: MultiVecOpVVV = vop(1);
fit11.default($fit11)
fit11.add(2, fit11_2);
fit11.add(3, fit11_3);
fit11.add(4, fit11_4);