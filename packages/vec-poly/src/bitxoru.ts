import type { MultiVecOpVV } from "./api.js";
import { bitXorU as $bitXorU } from "@thi.ng/vec-nd/bitxoru";
import { bitXorU2 } from "@thi.ng/vec2/bitxoru";
import { bitXorU3 } from "@thi.ng/vec3/bitxoru";
import { bitXorU4 } from "@thi.ng/vec4/bitxoru";
import { vop } from "./vop.js";

/**
 * Componentwise binary XOR of given nD unsigned integer vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorU: MultiVecOpVV = vop(1);
bitXorU.default($bitXorU)
bitXorU.add(2, bitXorU2);
bitXorU.add(3, bitXorU3);
bitXorU.add(4, bitXorU4);