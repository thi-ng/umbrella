import type { MultiVecOpVV } from "./api.js";
import { bitXorI as $bitXorI } from "@thi.ng/vec-nd/bitxori";
import { bitXorI2 } from "@thi.ng/vec2/bitxori";
import { bitXorI3 } from "@thi.ng/vec3/bitxori";
import { bitXorI4 } from "@thi.ng/vec4/bitxori";
import { vop } from "./vop.js";

/**
 * Componentwise binary XOR of given nD signed integer vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorI: MultiVecOpVV = vop(1);
bitXorI.default($bitXorI)
bitXorI.add(2, bitXorI2);
bitXorI.add(3, bitXorI3);
bitXorI.add(4, bitXorI4);