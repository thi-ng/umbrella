import type { MultiVecOpVN } from "./api.js";
import { rshiftNU as $rshiftNU } from "@thi.ng/vec-nd/rshiftnu";
import { rshiftNU2 } from "@thi.ng/vec2/rshiftnu";
import { rshiftNU3 } from "@thi.ng/vec3/rshiftnu";
import { rshiftNU4 } from "@thi.ng/vec4/rshiftnu";
import { vop } from "./vop.js";

/**
 * Componentwise binary right shift of given nD unsigned integer vector by
 * uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNU: MultiVecOpVN = vop(1);
rshiftNU.default($rshiftNU)
rshiftNU.add(2, rshiftNU2);
rshiftNU.add(3, rshiftNU3);
rshiftNU.add(4, rshiftNU4);