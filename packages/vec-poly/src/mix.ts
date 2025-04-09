import type { MultiVecOpVVV } from "./api.js";
import { mix as $mix } from "@thi.ng/vec-nd/mix";
import { mix2 } from "@thi.ng/vec2/mix";
import { mix3 } from "@thi.ng/vec3/mix";
import { mix4 } from "@thi.ng/vec4/mix";
import { vop } from "./vop.js";

/**
 * Componentwise nD vector linear interpolation.
 * `o = a + (b - a) * c`
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const mix: MultiVecOpVVV = vop(1);
mix.default($mix)
mix.add(2, mix2);
mix.add(3, mix3);
mix.add(4, mix4);