import type { MultiVecOpVV } from "./api.js";
import { mul as $mul } from "@thi.ng/vec-nd/mul";
import { mul2 } from "@thi.ng/vec2/mul";
import { mul3 } from "@thi.ng/vec3/mul";
import { mul4 } from "@thi.ng/vec4/mul";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector multiplication.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul: MultiVecOpVV = vop(1);
mul.default($mul)
mul.add(2, mul2);
mul.add(3, mul3);
mul.add(4, mul4);