import type { MultiVecOpVN } from "./api.js";
import { bitAndNU as $bitAndNU } from "@thi.ng/vec-nd/bitandnu";
import { bitAndNU2 } from "@thi.ng/vec2/bitandnu";
import { bitAndNU3 } from "@thi.ng/vec3/bitandnu";
import { bitAndNU4 } from "@thi.ng/vec4/bitandnu";
import { vop } from "./vop.js";

/**
 * Componentwise binary AND of given nD unsigned integer vector and uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNU: MultiVecOpVN = vop(1);
bitAndNU.default($bitAndNU)
bitAndNU.add(2, bitAndNU2);
bitAndNU.add(3, bitAndNU3);
bitAndNU.add(4, bitAndNU4);