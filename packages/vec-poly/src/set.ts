import type { MultiVecOpV } from "./api.js";
import { set as $set } from "@thi.ng/vec-nd/set";
import { set2 } from "@thi.ng/vec2/set";
import { set3 } from "@thi.ng/vec3/set";
import { set4 } from "@thi.ng/vec4/set";
import { vop } from "./vop.js";

/**
 * Copies nD vector `a` to `o` (or if latter is null, creates a new vector).
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set: MultiVecOpV = vop(1);
set.default($set)
set.add(2, set2);
set.add(3, set3);
set.add(4, set4);