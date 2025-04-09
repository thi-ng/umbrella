import type { MultiToBVecOpV } from "./api.js";
import { isInf as $isInf } from "@thi.ng/vec-nd/is-inf";
import { isInf2 } from "@thi.ng/vec2/is-inf";
import { isInf3 } from "@thi.ng/vec3/is-inf";
import { isInf4 } from "@thi.ng/vec4/is-inf";
import { vop } from "./vop.js";

/**
 * Componentwise checks if given nD vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf: MultiToBVecOpV = vop(1);
isInf.default($isInf)
isInf.add(2, isInf2);
isInf.add(3, isInf3);
isInf.add(4, isInf4);