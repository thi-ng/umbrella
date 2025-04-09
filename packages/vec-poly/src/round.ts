import type { MultiVecOpVV } from "./api.js";
import { round as $round } from "@thi.ng/vec-nd/round";
import { round2 } from "@thi.ng/vec2/round";
import { round3 } from "@thi.ng/vec3/round";
import { round4 } from "@thi.ng/vec4/round";
import { vop } from "./vop.js";

/**
 * Componentwise rounds given nD vector `a` to multiples of components in
 * vector `b`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round: MultiVecOpVV = vop(1);
round.default($round)
round.add(2, round2);
round.add(3, round3);
round.add(4, round4);