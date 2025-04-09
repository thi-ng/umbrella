import type { MultiVecOpV } from "./api.js";
import { abs as $abs } from "@thi.ng/vec-nd/abs";
import { abs2 } from "@thi.ng/vec2/abs";
import { abs3 } from "@thi.ng/vec3/abs";
import { abs4 } from "@thi.ng/vec4/abs";
import { vop } from "./vop.js";

/**
 * Componentwise absolute value of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs: MultiVecOpV = vop(1);
abs.default($abs)
abs.add(2, abs2);
abs.add(3, abs3);
abs.add(4, abs4);