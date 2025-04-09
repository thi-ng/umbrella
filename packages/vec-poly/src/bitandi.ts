import type { MultiVecOpVV } from "./api.js";
import { bitAndI as $bitAndI } from "@thi.ng/vec-nd/bitandi";
import { bitAndI2 } from "@thi.ng/vec2/bitandi";
import { bitAndI3 } from "@thi.ng/vec3/bitandi";
import { bitAndI4 } from "@thi.ng/vec4/bitandi";
import { vop } from "./vop.js";

/**
 * Componentwise binary AND of given nD signed integer vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndI: MultiVecOpVV = vop(1);
bitAndI.default($bitAndI)
bitAndI.add(2, bitAndI2);
bitAndI.add(3, bitAndI3);
bitAndI.add(4, bitAndI4);