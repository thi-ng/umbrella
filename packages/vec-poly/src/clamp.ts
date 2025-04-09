import type { MultiVecOpVVV } from "./api.js";
import { clamp as $clamp } from "@thi.ng/vec-nd/clamp";
import { clamp2 } from "@thi.ng/vec2/clamp";
import { clamp3 } from "@thi.ng/vec3/clamp";
import { clamp4 } from "@thi.ng/vec4/clamp";
import { vop } from "./vop.js";

/**
 * Componentwise constrains given nD vector `a` to the closed interval defined
 * by vectors `b` and `c`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const clamp: MultiVecOpVVV = vop(1);
clamp.default($clamp)
clamp.add(2, clamp2);
clamp.add(3, clamp3);
clamp.add(4, clamp4);