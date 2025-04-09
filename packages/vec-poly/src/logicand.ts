import type { MultiBVecOpVV } from "./api.js";
import { logicAnd as $logicAnd } from "@thi.ng/vec-nd/logicand";
import { logicAnd2 } from "@thi.ng/vec2/logicand";
import { logicAnd3 } from "@thi.ng/vec3/logicand";
import { logicAnd4 } from "@thi.ng/vec4/logicand";
import { vop } from "./vop.js";

/**
 * Componentwise logical AND of given nD boolean vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd: MultiBVecOpVV = vop(1);
logicAnd.default($logicAnd)
logicAnd.add(2, logicAnd2);
logicAnd.add(3, logicAnd3);
logicAnd.add(4, logicAnd4);