import type { MultiVecOpV } from "./api.js";
import { asIVec as $asIVec } from "@thi.ng/vec-nd/as-ivec";
import { asIVec2 } from "@thi.ng/vec2/as-ivec";
import { asIVec3 } from "@thi.ng/vec3/as-ivec";
import { asIVec4 } from "@thi.ng/vec4/as-ivec";
import { vop } from "./vop.js";

/**
 * Componentwise converts given nD vector to signed integer.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asIVec: MultiVecOpV = vop(1);
asIVec.default($asIVec)
asIVec.add(2, asIVec2);
asIVec.add(3, asIVec3);
asIVec.add(4, asIVec4);