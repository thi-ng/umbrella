import type { MultiVecOpRoVV } from "./api.js";
import { distSq as $distSq } from "@thi.ng/vec-nd/distsq";
import { distSq2 } from "@thi.ng/vec2/distsq";
import { distSq3 } from "@thi.ng/vec3/distsq";
import { distSq4 } from "@thi.ng/vec4/distsq";
import { vop } from "./vop.js";

/**
 * Computes the squared Eucledian distance between given vectors.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const distSq: MultiVecOpRoVV<number> = vop(0);
distSq.default($distSq)
distSq.add(2, distSq2);
distSq.add(3, distSq3);
distSq.add(4, distSq4);