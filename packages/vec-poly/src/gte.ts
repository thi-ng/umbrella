import type { MultiCompareOp } from "./api.js";
import { gte as $gte } from "@thi.ng/vec-nd/gte";
import { gte2 } from "@thi.ng/vec2/gte";
import { gte3 } from "@thi.ng/vec3/gte";
import { gte4 } from "@thi.ng/vec4/gte";
import { vop } from "./vop.js";

/**
 * Compnentwise checks if given nD vector `a` is greater than or equal to `b`
 * and writes results to boolean output vector. If `out` is null, creates a new
 * result vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const gte: MultiCompareOp = vop(1);
gte.default($gte)
gte.add(2, gte2);
gte.add(3, gte3);
gte.add(4, gte4);