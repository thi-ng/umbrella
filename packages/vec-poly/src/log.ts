import type { MultiVecOpV } from "./api.js";
import { log as $log } from "@thi.ng/vec-nd/log";
import { log2 } from "@thi.ng/vec2/log";
import { log3 } from "@thi.ng/vec3/log";
import { log4 } from "@thi.ng/vec4/log";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.log` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log: MultiVecOpV = vop(1);
log.default($log)
log.add(2, log2);
log.add(3, log3);
log.add(4, log4);