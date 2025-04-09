import type { MultiVecOpRoVV } from "./api.js";
import { distManhattan as $distManhattan } from "@thi.ng/vec-nd/dist-manhattan";
import { distManhattan2 } from "@thi.ng/vec2/dist-manhattan";
import { distManhattan3 } from "@thi.ng/vec3/dist-manhattan";
import { distManhattan4 } from "@thi.ng/vec4/dist-manhattan";
import { vop } from "./vop.js";

/**
 * Computes the Manhattan (or Taxicab) distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const distManhattan: MultiVecOpRoVV<number> = vop(0);
distManhattan.default($distManhattan)
distManhattan.add(2, distManhattan2);
distManhattan.add(3, distManhattan3);
distManhattan.add(4, distManhattan4);