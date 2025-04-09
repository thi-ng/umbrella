import type { MultiVecOpV } from "./api.js";
import { floor as $floor } from "@thi.ng/vec-nd/floor";
import { floor2 } from "@thi.ng/vec2/floor";
import { floor3 } from "@thi.ng/vec3/floor";
import { floor4 } from "@thi.ng/vec4/floor";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.floor` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor: MultiVecOpV = vop(1);
floor.default($floor)
floor.add(2, floor2);
floor.add(3, floor3);
floor.add(4, floor4);