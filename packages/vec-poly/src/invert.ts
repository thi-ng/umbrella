import type { MultiVecOpV } from "./api.js";
import { invert as $invert } from "@thi.ng/vec-nd/invert";
import { invert2 } from "@thi.ng/vec2/invert";
import { invert3 } from "@thi.ng/vec3/invert";
import { invert4 } from "@thi.ng/vec4/invert";
import { vop } from "./vop.js";

/**
 * Componentwise computes the reciprocal (1/x) of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert: MultiVecOpV = vop(1);
invert.default($invert)
invert.add(2, invert2);
invert.add(3, invert3);
invert.add(4, invert4);