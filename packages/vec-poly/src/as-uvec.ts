import type { MultiVecOpV } from "./api.js";
import { asUVec as $asUVec } from "@thi.ng/vec-nd/as-uvec";
import { asUVec2 } from "@thi.ng/vec2/as-uvec";
import { asUVec3 } from "@thi.ng/vec3/as-uvec";
import { asUVec4 } from "@thi.ng/vec4/as-uvec";
import { vop } from "./vop.js";

/**
 * Componentwise converts given nD vector to unsigned integer.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec: MultiVecOpV = vop(1);
asUVec.default($asUVec)
asUVec.add(2, asUVec2);
asUVec.add(3, asUVec3);
asUVec.add(4, asUVec4);