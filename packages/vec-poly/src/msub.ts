import type { MultiVecOpVVV } from "./api.js";
import { msub as $msub } from "@thi.ng/vec-nd/msub";
import { msub2 } from "@thi.ng/vec2/msub";
import { msub3 } from "@thi.ng/vec3/msub";
import { msub4 } from "@thi.ng/vec4/msub";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector multiply-subtract.
 * `o = a * b - c`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const msub: MultiVecOpVVV = vop(1);
msub.default($msub)
msub.add(2, msub2);
msub.add(3, msub3);
msub.add(4, msub4);