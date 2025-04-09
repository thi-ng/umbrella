import type { MultiVecOpVN } from "./api.js";
import { lshiftNU as $lshiftNU } from "@thi.ng/vec-nd/lshiftnu";
import { lshiftNU2 } from "@thi.ng/vec2/lshiftnu";
import { lshiftNU3 } from "@thi.ng/vec3/lshiftnu";
import { lshiftNU4 } from "@thi.ng/vec4/lshiftnu";
import { vop } from "./vop.js";

/**
 * Componentwise binary left shift of given nD unsigned integer vector by
 * uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNU: MultiVecOpVN = vop(1);
lshiftNU.default($lshiftNU)
lshiftNU.add(2, lshiftNU2);
lshiftNU.add(3, lshiftNU3);
lshiftNU.add(4, lshiftNU4);