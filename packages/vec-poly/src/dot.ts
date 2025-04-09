import type { MultiVecOpRoVV } from "./api.js";
import { dot as $dot } from "@thi.ng/vec-nd/dot";
import { dot2 } from "@thi.ng/vec2/dot";
import { dot3 } from "@thi.ng/vec3/dot";
import { dot4 } from "@thi.ng/vec4/dot";
import { vop } from "./vop.js";

/**
 * Computes dot product of given nD vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const dot: MultiVecOpRoVV<number> = vop(0);
dot.default($dot)
dot.add(2, dot2);
dot.add(3, dot3);
dot.add(4, dot4);