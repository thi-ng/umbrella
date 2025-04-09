import type { MultiVecOpVV } from "./api.js";
import { atan_2 as $atan_2 } from "@thi.ng/vec-nd/atan2";
import { atan_22 } from "@thi.ng/vec2/atan2";
import { atan_23 } from "@thi.ng/vec3/atan2";
import { atan_24 } from "@thi.ng/vec4/atan2";
import { vop } from "./vop.js";

/**
 * Componentwise computes `Math.atan2` of the two given nD vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan_2: MultiVecOpVV = vop(1);
atan_2.default($atan_2)
atan_2.add(2, atan_22);
atan_2.add(3, atan_23);
atan_2.add(4, atan_24);