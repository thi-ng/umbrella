import type { MultiVecOpVN } from "./api.js";
import { bitOrNU as $bitOrNU } from "@thi.ng/vec-nd/bitornu";
import { bitOrNU2 } from "@thi.ng/vec2/bitornu";
import { bitOrNU3 } from "@thi.ng/vec3/bitornu";
import { bitOrNU4 } from "@thi.ng/vec4/bitornu";
import { vop } from "./vop.js";

/**
 * Componentwise binary OR of given nD unsigned integer vector and uniform
 * scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU: MultiVecOpVN = vop(1);
bitOrNU.default($bitOrNU)
bitOrNU.add(2, bitOrNU2);
bitOrNU.add(3, bitOrNU3);
bitOrNU.add(4, bitOrNU4);