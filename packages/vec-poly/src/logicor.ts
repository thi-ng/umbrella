import type { MultiBVecOpVV } from "./api.js";
import { logicOr as $logicOr } from "@thi.ng/vec-nd/logicor";
import { logicOr2 } from "@thi.ng/vec2/logicor";
import { logicOr3 } from "@thi.ng/vec3/logicor";
import { logicOr4 } from "@thi.ng/vec4/logicor";
import { vop } from "./vop.js";

/**
 * Componentwise logical OR of given nD boolean vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicOr: MultiBVecOpVV = vop(1);
logicOr.default($logicOr)
logicOr.add(2, logicOr2);
logicOr.add(3, logicOr3);
logicOr.add(4, logicOr4);