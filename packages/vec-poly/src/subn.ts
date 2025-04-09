import type { MultiVecOpVN } from "./api.js";
import { subN as $subN } from "@thi.ng/vec-nd/subn";
import { subN2 } from "@thi.ng/vec2/subn";
import { subN3 } from "@thi.ng/vec3/subn";
import { subN4 } from "@thi.ng/vec4/subn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector subtraction with a uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN: MultiVecOpVN = vop(1);
subN.default($subN)
subN.add(2, subN2);
subN.add(3, subN3);
subN.add(4, subN4);