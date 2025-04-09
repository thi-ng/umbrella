import type { MultiCompareOp } from "./api.js";
import { neq as $neq } from "@thi.ng/vec-nd/neq";
import { neq2 } from "@thi.ng/vec2/neq";
import { neq3 } from "@thi.ng/vec3/neq";
import { neq4 } from "@thi.ng/vec4/neq";
import { vop } from "./vop.js";

/**
 * Compnentwise checks if given nD vectors `a` and `b` are not equal (using
 * `!==` for comparison) and writes results to boolean output vector. If `out`
 * is null, creates a new result vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const neq: MultiCompareOp = vop(1);
neq.default($neq)
neq.add(2, neq2);
neq.add(3, neq3);
neq.add(4, neq4);