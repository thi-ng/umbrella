import type { MultiVecOpVV } from "./api.js";
import { div as $div } from "@thi.ng/vec-nd/div";
import { div2 } from "@thi.ng/vec2/div";
import { div3 } from "@thi.ng/vec3/div";
import { div4 } from "@thi.ng/vec4/div";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector division.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const div: MultiVecOpVV = vop(1);
div.default($div)
div.add(2, div2);
div.add(3, div3);
div.add(4, div4);