import type { MultiVecOpV } from "./api.js";
import { radians as $radians } from "@thi.ng/vec-nd/radians";
import { radians2 } from "@thi.ng/vec2/radians";
import { radians3 } from "@thi.ng/vec3/radians";
import { radians4 } from "@thi.ng/vec4/radians";
import { vop } from "./vop.js";

/**
 * Componentwise computes converts degrees to radians of given nD vector. Also
 * see {@link degrees}.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians: MultiVecOpV = vop(1);
radians.default($radians)
radians.add(2, radians2);
radians.add(3, radians3);
radians.add(4, radians4);