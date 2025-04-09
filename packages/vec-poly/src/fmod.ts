import type { MultiVecOpVV } from "./api.js";
import { fmod as $fmod } from "@thi.ng/vec-nd/fmod";
import { fmod2 } from "@thi.ng/vec2/fmod";
import { fmod3 } from "@thi.ng/vec3/fmod";
import { fmod4 } from "@thi.ng/vec4/fmod";
import { vop } from "./vop.js";

/**
 * Similar to {@link mod}, {@link remainder}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod: MultiVecOpVV = vop(1);
fmod.default($fmod)
fmod.add(2, fmod2);
fmod.add(3, fmod3);
fmod.add(4, fmod4);