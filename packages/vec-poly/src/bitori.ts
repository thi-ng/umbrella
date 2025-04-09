import type { MultiVecOpVV } from "./api.js";
import { bitOrI as $bitOrI } from "@thi.ng/vec-nd/bitori";
import { bitOrI2 } from "@thi.ng/vec2/bitori";
import { bitOrI3 } from "@thi.ng/vec3/bitori";
import { bitOrI4 } from "@thi.ng/vec4/bitori";
import { vop } from "./vop.js";

/**
 * Componentwise binary OR of given nD signed integer vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI: MultiVecOpVV = vop(1);
bitOrI.default($bitOrI)
bitOrI.add(2, bitOrI2);
bitOrI.add(3, bitOrI3);
bitOrI.add(4, bitOrI4);