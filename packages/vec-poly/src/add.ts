import type { MultiVecOpVV } from "./api.js";
import { add as $add } from "@thi.ng/vec-nd/add";
import { add2 } from "@thi.ng/vec2/add";
import { add3 } from "@thi.ng/vec3/add";
import { add4 } from "@thi.ng/vec4/add";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector addition.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add: MultiVecOpVV = vop(1);
add.default($add)
add.add(2, add2);
add.add(3, add3);
add.add(4, add4);