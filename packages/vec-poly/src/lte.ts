import type { MultiCompareOp } from "./api.js";
import { lte as $lte } from "@thi.ng/vec-nd/lte";
import { lte2 } from "@thi.ng/vec2/lte";
import { lte3 } from "@thi.ng/vec3/lte";
import { lte4 } from "@thi.ng/vec4/lte";
import { vop } from "./vop.js";

/**
 * Compnentwise checks if given nD vector `a` is less than or equal to `b` and
 * writes results to boolean output vector. If `out` is null, creates a new
 * result vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const lte: MultiCompareOp = vop(1);
lte.default($lte)
lte.add(2, lte2);
lte.add(3, lte3);
lte.add(4, lte4);