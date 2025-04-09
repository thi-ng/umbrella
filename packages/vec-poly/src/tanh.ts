import type { MultiVecOpV } from "./api.js";
import { tanh as $tanh } from "@thi.ng/vec-nd/tanh";
import { tanh2 } from "@thi.ng/vec2/tanh";
import { tanh3 } from "@thi.ng/vec3/tanh";
import { tanh4 } from "@thi.ng/vec4/tanh";
import { vop } from "./vop.js";

/**
 * Componentwise `Math.tanh` of given nD vector.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh: MultiVecOpV = vop(1);
tanh.default($tanh)
tanh.add(2, tanh2);
tanh.add(3, tanh3);
tanh.add(4, tanh4);