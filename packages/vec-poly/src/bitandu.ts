import type { MultiVecOpVV } from "./api.js";
import { bitAndU as $bitAndU } from "@thi.ng/vec-nd/bitandu";
import { bitAndU2 } from "@thi.ng/vec2/bitandu";
import { bitAndU3 } from "@thi.ng/vec3/bitandu";
import { bitAndU4 } from "@thi.ng/vec4/bitandu";
import { vop } from "./vop.js";

/**
 * Componentwise binary AND of given nD unsigned integer vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndU: MultiVecOpVV = vop(1);
bitAndU.default($bitAndU)
bitAndU.add(2, bitAndU2);
bitAndU.add(3, bitAndU3);
bitAndU.add(4, bitAndU4);