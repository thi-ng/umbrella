import type { MultiVecOpVN } from "./api.js";
import { divN as $divN } from "@thi.ng/vec-nd/divn";
import { divN2 } from "@thi.ng/vec2/divn";
import { divN3 } from "@thi.ng/vec3/divn";
import { divN4 } from "@thi.ng/vec4/divn";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector division with a uniform scalar.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divN: MultiVecOpVN = vop(1);
divN.default($divN)
divN.add(2, divN2);
divN.add(3, divN3);
divN.add(4, divN4);