import type { MultiVecOpV } from "./api.js";
import { clamp11 as $clamp11 } from "@thi.ng/vec-nd/clamp11";
import { clamp11_2 } from "@thi.ng/vec2/clamp11";
import { clamp11_3 } from "@thi.ng/vec3/clamp11";
import { clamp11_4 } from "@thi.ng/vec4/clamp11";
import { vop } from "./vop.js";

/**
 * Componentwise constrains given nD vector `a` to the closed [-1,1] interval.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp11: MultiVecOpV = vop(1);
clamp11.default($clamp11)
clamp11.add(2, clamp11_2);
clamp11.add(3, clamp11_3);
clamp11.add(4, clamp11_4);