import type { MultiVecOpVV } from "./api.js";
import { bitOrU as $bitOrU } from "@thi.ng/vec-nd/bitoru";
import { bitOrU2 } from "@thi.ng/vec2/bitoru";
import { bitOrU3 } from "@thi.ng/vec3/bitoru";
import { bitOrU4 } from "@thi.ng/vec4/bitoru";
import { vop } from "./vop.js";

/**
 * Componentwise binary OR of given nD unsigned integer vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrU: MultiVecOpVV = vop(1);
bitOrU.default($bitOrU)
bitOrU.add(2, bitOrU2);
bitOrU.add(3, bitOrU3);
bitOrU.add(4, bitOrU4);