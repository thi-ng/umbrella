import type { MultiVecOpVV } from "./api.js";
import { remainder as $remainder } from "@thi.ng/vec-nd/remainder";
import { remainder2 } from "@thi.ng/vec2/remainder";
import { remainder3 } from "@thi.ng/vec3/remainder";
import { remainder4 } from "@thi.ng/vec4/remainder";
import { vop } from "./vop.js";

/**
 * Componentwise computes modulo of given nD vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a /
 * b)`. Also see {@link mod}, {@link fmod}.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder: MultiVecOpVV = vop(1);
remainder.default($remainder)
remainder.add(2, remainder2);
remainder.add(3, remainder3);
remainder.add(4, remainder4);