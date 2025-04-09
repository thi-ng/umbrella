import type { MultiVecOpVVN } from "./api.js";
import { submN as $submN } from "@thi.ng/vec-nd/submn";
import { submN2 } from "@thi.ng/vec2/submn";
import { submN3 } from "@thi.ng/vec3/submn";
import { submN4 } from "@thi.ng/vec4/submn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector subtract-multiply with scalar factor.
 * `o = (a - b) * n`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN: MultiVecOpVVN = vop(1);
submN.default($submN)
submN.add(2, submN2);
submN.add(3, submN3);
submN.add(4, submN4);