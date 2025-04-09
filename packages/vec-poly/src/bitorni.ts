import type { MultiVecOpVN } from "./api.js";
import { bitOrNI as $bitOrNI } from "@thi.ng/vec-nd/bitorni";
import { bitOrNI2 } from "@thi.ng/vec2/bitorni";
import { bitOrNI3 } from "@thi.ng/vec3/bitorni";
import { bitOrNI4 } from "@thi.ng/vec4/bitorni";
import { vop } from "./vop.js";

/**
 * Componentwise binary OR of given nD signed integer vector and uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNI: MultiVecOpVN = vop(1);
bitOrNI.default($bitOrNI)
bitOrNI.add(2, bitOrNI2);
bitOrNI.add(3, bitOrNI3);
bitOrNI.add(4, bitOrNI4);