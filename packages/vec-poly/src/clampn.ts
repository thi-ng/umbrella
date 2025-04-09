import type { MultiVecOpVNN } from "./api.js";
import { clampN as $clampN } from "@thi.ng/vec-nd/clampn";
import { clampN2 } from "@thi.ng/vec2/clampn";
import { clampN3 } from "@thi.ng/vec3/clampn";
import { clampN4 } from "@thi.ng/vec4/clampn";
import { vop } from "./vop.js";

/**
 * Componentwise constrains value of given nD vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN: MultiVecOpVNN = vop(1);
clampN.default($clampN)
clampN.add(2, clampN2);
clampN.add(3, clampN3);
clampN.add(4, clampN4);