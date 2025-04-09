import type { MultiCompareOp } from "./api.js";
import { eq as $eq } from "@thi.ng/vec-nd/eq";
import { eq2 } from "@thi.ng/vec2/eq";
import { eq3 } from "@thi.ng/vec3/eq";
import { eq4 } from "@thi.ng/vec4/eq";
import { vop } from "./vop.js";

/**
 * Compnentwise checks if given nD vectors `a` and `b` are equal (using `===`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const eq: MultiCompareOp = vop(1);
eq.default($eq)
eq.add(2, eq2);
eq.add(3, eq3);
eq.add(4, eq4);