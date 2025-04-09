import type { MultiVecOpVN } from "./api.js";
import { bitAndNI as $bitAndNI } from "@thi.ng/vec-nd/bitandni";
import { bitAndNI2 } from "@thi.ng/vec2/bitandni";
import { bitAndNI3 } from "@thi.ng/vec3/bitandni";
import { bitAndNI4 } from "@thi.ng/vec4/bitandni";
import { vop } from "./vop.js";

/**
 * Componentwise binary AND of given nD signed integer vector and uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNI: MultiVecOpVN = vop(1);
bitAndNI.default($bitAndNI)
bitAndNI.add(2, bitAndNI2);
bitAndNI.add(3, bitAndNI3);
bitAndNI.add(4, bitAndNI4);