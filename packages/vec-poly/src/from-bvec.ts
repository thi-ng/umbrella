import type { MultiFromBVecOpV } from "./api.js";
import { fromBVec as $fromBVec } from "@thi.ng/vec-nd/from-bvec";
import { fromBVec2 } from "@thi.ng/vec2/from-bvec";
import { fromBVec3 } from "@thi.ng/vec3/from-bvec";
import { fromBVec4 } from "@thi.ng/vec4/from-bvec";
import { vop } from "./vop.js";

/**
 * Componentwise converts given nD boolean vector to floating point (0 or 1).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec: MultiFromBVecOpV = vop(1);
fromBVec.default($fromBVec)
fromBVec.add(2, fromBVec2);
fromBVec.add(3, fromBVec3);
fromBVec.add(4, fromBVec4);