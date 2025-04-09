import type { MultiVecOpV } from "./api.js";
import { acos as $acos } from "@thi.ng/vec-nd/acos";
import { acos2 } from "@thi.ng/vec2/acos";
import { acos3 } from "@thi.ng/vec3/acos";
import { acos4 } from "@thi.ng/vec4/acos";
import { vop } from "./vop.js";

/**
 * Componentwise computes `Math.acos` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos: MultiVecOpV = vop(1);
acos.default($acos)
acos.add(2, acos2);
acos.add(3, acos3);
acos.add(4, acos4);