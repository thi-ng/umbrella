import type { MultiVecOpV } from "./api.js";
import { clamp01 as $clamp01 } from "@thi.ng/vec-nd/clamp01";
import { clamp01_2 } from "@thi.ng/vec2/clamp01";
import { clamp01_3 } from "@thi.ng/vec3/clamp01";
import { clamp01_4 } from "@thi.ng/vec4/clamp01";
import { vop } from "./vop.js";

/**
 * Componentwise constrains given nD vector `a` to the closed [0,1] interval.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp01: MultiVecOpV = vop(1);
clamp01.default($clamp01)
clamp01.add(2, clamp01_2);
clamp01.add(3, clamp01_3);
clamp01.add(4, clamp01_4);