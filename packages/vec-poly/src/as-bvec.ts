import type { MultiToBVecOpV } from "./api.js";
import { asBVec as $asBVec } from "@thi.ng/vec-nd/as-bvec";
import { asBVec2 } from "@thi.ng/vec2/as-bvec";
import { asBVec3 } from "@thi.ng/vec3/as-bvec";
import { asBVec4 } from "@thi.ng/vec4/as-bvec";
import { vop } from "./vop.js";

/**
 * Componentwise converts given nD vector to boolean.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec: MultiToBVecOpV = vop(1);
asBVec.default($asBVec)
asBVec.add(2, asBVec2);
asBVec.add(3, asBVec3);
asBVec.add(4, asBVec4);