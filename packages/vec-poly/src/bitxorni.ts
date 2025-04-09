import type { MultiVecOpVN } from "./api.js";
import { bitXorNI as $bitXorNI } from "@thi.ng/vec-nd/bitxorni";
import { bitXorNI2 } from "@thi.ng/vec2/bitxorni";
import { bitXorNI3 } from "@thi.ng/vec3/bitxorni";
import { bitXorNI4 } from "@thi.ng/vec4/bitxorni";
import { vop } from "./vop.js";

/**
 * Componentwise binary XOR of given nD signed integer vector and uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNI: MultiVecOpVN = vop(1);
bitXorNI.default($bitXorNI)
bitXorNI.add(2, bitXorNI2);
bitXorNI.add(3, bitXorNI3);
bitXorNI.add(4, bitXorNI4);