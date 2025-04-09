import type { MultiVecOpRoV } from "./api.js";
import { minor as $minor } from "@thi.ng/vec-nd/minor";
import { minor2 } from "@thi.ng/vec2/minor";
import { minor3 } from "@thi.ng/vec3/minor";
import { minor4 } from "@thi.ng/vec4/minor";
import { vop } from "./vop.js";

/**
 * Returns index of minor component/axis in given nD vector, i.e. where
 * `|v[i]|` is the smallest.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const minor: MultiVecOpRoV<number> = vop(0);
minor.default($minor)
minor.add(2, minor2);
minor.add(3, minor3);
minor.add(4, minor4);