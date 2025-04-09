import type { MultiVecOpV } from "./api.js";
import { cosh as $cosh } from "@thi.ng/vec-nd/cosh";
import { cosh2 } from "@thi.ng/vec2/cosh";
import { cosh3 } from "@thi.ng/vec3/cosh";
import { cosh4 } from "@thi.ng/vec4/cosh";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.cosh` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh: MultiVecOpV = vop(1);
cosh.default($cosh)
cosh.add(2, cosh2);
cosh.add(3, cosh3);
cosh.add(4, cosh4);