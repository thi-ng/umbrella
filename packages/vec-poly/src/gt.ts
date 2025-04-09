import type { MultiCompareOp } from "./api.js";
import { gt as $gt } from "@thi.ng/vec-nd/gt";
import { gt2 } from "@thi.ng/vec2/gt";
import { gt3 } from "@thi.ng/vec3/gt";
import { gt4 } from "@thi.ng/vec4/gt";
import { vop } from "./vop.js";

/**
 * Compnentwise checks if given nD vector `a` is greater than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const gt: MultiCompareOp = vop(1);
gt.default($gt)
gt.add(2, gt2);
gt.add(3, gt3);
gt.add(4, gt4);