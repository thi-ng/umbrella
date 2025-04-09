import type { MultiVecOpVV } from "./api.js";
import { mod as $mod } from "@thi.ng/vec-nd/mod";
import { mod2 } from "@thi.ng/vec2/mod";
import { mod3 } from "@thi.ng/vec3/mod";
import { mod4 } from "@thi.ng/vec4/mod";
import { vop } from "./vop.js";

/**
 * Componentwise computes modulo of given nD vector. Similar to {@link fmod},
 * {@link remainder}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod: MultiVecOpVV = vop(1);
mod.default($mod)
mod.add(2, mod2);
mod.add(3, mod3);
mod.add(4, mod4);