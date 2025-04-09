import type { MultiVecOpVVVVV } from "./api.js";
import { fit as $fit } from "@thi.ng/vec-nd/fit";
import { fit2 } from "@thi.ng/vec2/fit";
import { fit3 } from "@thi.ng/vec3/fit";
import { fit4 } from "@thi.ng/vec4/fit";
import { vop } from "./vop.js";

/**
 * Componentwise maps given nD vector `a` from the closed source interval
 * defined by `[b,c]` to the target interval `[d,e]`. Writes result into `o`
 * (or if null, back into `a`)
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param d - input vector
 * @param e - input vector
 */
export const fit: MultiVecOpVVVVV = vop(1);
fit.default($fit)
fit.add(2, fit2);
fit.add(3, fit3);
fit.add(4, fit4);