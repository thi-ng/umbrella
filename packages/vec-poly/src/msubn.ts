import type { MultiVecOpVNV } from "./api.js";
import { msubN as $msubN } from "@thi.ng/vec-nd/msubn";
import { msubN2 } from "@thi.ng/vec2/msubn";
import { msubN3 } from "@thi.ng/vec3/msubn";
import { msubN4 } from "@thi.ng/vec4/msubn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector multiply-subtract with a uniform scalar factor.
 * `o = a * n - b`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const msubN: MultiVecOpVNV = vop(1);
msubN.default($msubN)
msubN.add(2, msubN2);
msubN.add(3, msubN3);
msubN.add(4, msubN4);