import type { MultiVecOpVN } from "./api.js";
import { bitXorNU as $bitXorNU } from "@thi.ng/vec-nd/bitxornu";
import { bitXorNU2 } from "@thi.ng/vec2/bitxornu";
import { bitXorNU3 } from "@thi.ng/vec3/bitxornu";
import { bitXorNU4 } from "@thi.ng/vec4/bitxornu";
import { vop } from "./vop.js";

/**
 * Componentwise binary XOR of given nD unsigned integer vector and uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNU: MultiVecOpVN = vop(1);
bitXorNU.default($bitXorNU)
bitXorNU.add(2, bitXorNU2);
bitXorNU.add(3, bitXorNU3);
bitXorNU.add(4, bitXorNU4);