import type { MultiVecOpV } from "./api.js";
import { atan as $atan } from "@thi.ng/vec-nd/atan";
import { atan2 } from "@thi.ng/vec2/atan";
import { atan3 } from "@thi.ng/vec3/atan";
import { atan4 } from "@thi.ng/vec4/atan";
import { vop } from "./vop.js";

/**
 * Componentwise computes `Math.atan` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan: MultiVecOpV = vop(1);
atan.default($atan)
atan.add(2, atan2);
atan.add(3, atan3);
atan.add(4, atan4);