import type { MultiVecOpVN } from "./api.js";
import { fmodN as $fmodN } from "@thi.ng/vec-nd/fmodn";
import { fmodN2 } from "@thi.ng/vec2/fmodn";
import { fmodN3 } from "@thi.ng/vec3/fmodn";
import { fmodN4 } from "@thi.ng/vec4/fmodn";
import { vop } from "./vop.js";

/**
 * Same as {@link fmod}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN: MultiVecOpVN = vop(1);
fmodN.default($fmodN)
fmodN.add(2, fmodN2);
fmodN.add(3, fmodN3);
fmodN.add(4, fmodN4);