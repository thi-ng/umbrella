import type { MultiVecOpV } from "./api.js";
import { log_2 as $log_2 } from "@thi.ng/vec-nd/log2";
import { log_22 } from "@thi.ng/vec2/log2";
import { log_23 } from "@thi.ng/vec3/log2";
import { log_24 } from "@thi.ng/vec4/log2";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.log2` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_2: MultiVecOpV = vop(1);
log_2.default($log_2)
log_2.add(2, log_22);
log_2.add(3, log_23);
log_2.add(4, log_24);