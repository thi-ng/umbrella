import type { MultiVecOpVVV } from "./api.js";
import { fit01 as $fit01 } from "@thi.ng/vec-nd/fit01";
import { fit01_2 } from "@thi.ng/vec2/fit01";
import { fit01_3 } from "@thi.ng/vec3/fit01";
import { fit01_4 } from "@thi.ng/vec4/fit01";
import { vop } from "./vop.js";

/**
 * Componentwise maps given nD vector `a` from the closed `[0,1]` interval to
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
export const fit01: MultiVecOpVVV = vop(1);
fit01.default($fit01)
fit01.add(2, fit01_2);
fit01.add(3, fit01_3);
fit01.add(4, fit01_4);