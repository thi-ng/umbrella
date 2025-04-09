import type { MultiBVecOpV } from "./api.js";
import { logicNot as $logicNot } from "@thi.ng/vec-nd/logicnot";
import { logicNot2 } from "@thi.ng/vec2/logicnot";
import { logicNot3 } from "@thi.ng/vec3/logicnot";
import { logicNot4 } from "@thi.ng/vec4/logicnot";
import { vop } from "./vop.js";

/**
 * Componentwise logical NOT of given nD boolean vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot: MultiBVecOpV = vop(1);
logicNot.default($logicNot)
logicNot.add(2, logicNot2);
logicNot.add(3, logicNot3);
logicNot.add(4, logicNot4);