import type { MultiVecOpV } from "./api.js";
import { fract as $fract } from "@thi.ng/vec-nd/fract";
import { fract2 } from "@thi.ng/vec2/fract";
import { fract3 } from "@thi.ng/vec3/fract";
import { fract4 } from "@thi.ng/vec4/fract";
import { vop } from "./vop.js";

/**
 * Componentwise computes fractional parts of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract: MultiVecOpV = vop(1);
fract.default($fract)
fract.add(2, fract2);
fract.add(3, fract3);
fract.add(4, fract4);