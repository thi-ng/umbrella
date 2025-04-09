import type { MultiVecOpN } from "./api.js";
import { setN as $setN } from "@thi.ng/vec-nd/setn";
import { setN2 } from "@thi.ng/vec2/setn";
import { setN3 } from "@thi.ng/vec3/setn";
import { setN4 } from "@thi.ng/vec4/setn";
import { vop } from "./vop.js";

/**
 * Sets all components of nD vector to scalar value `n`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN: MultiVecOpN = vop(1);
setN.default($setN)
setN.add(2, setN2);
setN.add(3, setN3);
setN.add(4, setN4);