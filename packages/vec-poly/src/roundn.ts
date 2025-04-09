import type { MultiVecOpVO } from "./api.js";
import { roundN as $roundN } from "@thi.ng/vec-nd/roundn";
import { roundN2 } from "@thi.ng/vec2/roundn";
import { roundN3 } from "@thi.ng/vec3/roundn";
import { roundN4 } from "@thi.ng/vec4/roundn";
import { vop } from "./vop.js";

/**
 * Componentwise rounds given nD vector `a` to multiples of uniform scalar `n`
 * (default: 1).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN: MultiVecOpVO<number> = vop(1);
roundN.default($roundN)
roundN.add(2, roundN2);
roundN.add(3, roundN3);
roundN.add(4, roundN4);