import type { MultiToBVecOpV } from "./api.js";
import { isNaN as $isNaN } from "@thi.ng/vec-nd/is-nan";
import { isNaN2 } from "@thi.ng/vec2/is-nan";
import { isNaN3 } from "@thi.ng/vec3/is-nan";
import { isNaN4 } from "@thi.ng/vec4/is-nan";
import { vop } from "./vop.js";

/**
 * Componentwise checks if given nD vector is NaN and writes results to boolean
 * output vector. If `out` is null, creates a new result vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN: MultiToBVecOpV = vop(1);
isNaN.default($isNaN)
isNaN.add(2, isNaN2);
isNaN.add(3, isNaN3);
isNaN.add(4, isNaN4);