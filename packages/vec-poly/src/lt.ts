import type { MultiCompareOp } from "./api.js";
import { lt as $lt } from "@thi.ng/vec-nd/lt";
import { lt2 } from "@thi.ng/vec2/lt";
import { lt3 } from "@thi.ng/vec3/lt";
import { lt4 } from "@thi.ng/vec4/lt";
import { vop } from "./vop.js";

/**
 * Compnentwise checks if given nD vector `a` is less than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const lt: MultiCompareOp = vop(1);
lt.default($lt)
lt.add(2, lt2);
lt.add(3, lt3);
lt.add(4, lt4);