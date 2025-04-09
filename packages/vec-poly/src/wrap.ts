import type { MultiVecOpVVV } from "./api.js";
import { wrap as $wrap } from "@thi.ng/vec-nd/wrap";
import { wrap2 } from "@thi.ng/vec2/wrap";
import { wrap3 } from "@thi.ng/vec3/wrap";
import { wrap4 } from "@thi.ng/vec4/wrap";
import { vop } from "./vop.js";

/**
 * Componentwise folds given nD vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap: MultiVecOpVVV = vop(1);
wrap.default($wrap)
wrap.add(2, wrap2);
wrap.add(3, wrap3);
wrap.add(4, wrap4);