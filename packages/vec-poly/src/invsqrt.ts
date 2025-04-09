import type { MultiVecOpV } from "./api.js";
import { invSqrt as $invSqrt } from "@thi.ng/vec-nd/invsqrt";
import { invSqrt2 } from "@thi.ng/vec2/invsqrt";
import { invSqrt3 } from "@thi.ng/vec3/invsqrt";
import { invSqrt4 } from "@thi.ng/vec4/invsqrt";
import { vop } from "./vop.js";

/**
 * Componentwise computes the inverse squareroot of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt: MultiVecOpV = vop(1);
invSqrt.default($invSqrt)
invSqrt.add(2, invSqrt2);
invSqrt.add(3, invSqrt3);
invSqrt.add(4, invSqrt4);