import type { MultiVecOpRoV } from "./api.js";
import { major as $major } from "@thi.ng/vec-nd/major";
import { major2 } from "@thi.ng/vec2/major";
import { major3 } from "@thi.ng/vec3/major";
import { major4 } from "@thi.ng/vec4/major";
import { vop } from "./vop.js";

/**
 * Returns index of major component/axis in `v`, i.e. where `|v[i]|` is the
 * largest.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const major: MultiVecOpRoV<number> = vop(0);
major.default($major)
major.add(2, major2);
major.add(3, major3);
major.add(4, major4);