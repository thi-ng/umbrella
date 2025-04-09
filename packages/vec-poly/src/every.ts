import type { MultiBVecOpRoV } from "./api.js";
import { every as $every } from "@thi.ng/vec-nd/every";
import { every2 } from "@thi.ng/vec2/every";
import { every3 } from "@thi.ng/vec3/every";
import { every4 } from "@thi.ng/vec4/every";
import { vop } from "./vop.js";

/**
 * Returns true if all vector components are truthy.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const every: MultiBVecOpRoV<boolean> = vop(1);
every.default($every)
every.add(2, every2);
every.add(3, every3);
every.add(4, every4);