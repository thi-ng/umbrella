import type { MultiVecOpVV } from "./api.js";
import { sub as $sub } from "@thi.ng/vec-nd/sub";
import { sub2 } from "@thi.ng/vec2/sub";
import { sub3 } from "@thi.ng/vec3/sub";
import { sub4 } from "@thi.ng/vec4/sub";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector subtraction.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const sub: MultiVecOpVV = vop(1);
sub.default($sub)
sub.add(2, sub2);
sub.add(3, sub3);
sub.add(4, sub4);