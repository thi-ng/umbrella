import type { MultiVecOpRoVV } from "./api.js";
import { distChebyshev as $distChebyshev } from "@thi.ng/vec-nd/dist-chebyshev";
import { distChebyshev2 } from "@thi.ng/vec2/dist-chebyshev";
import { distChebyshev3 } from "@thi.ng/vec3/dist-chebyshev";
import { distChebyshev4 } from "@thi.ng/vec4/dist-chebyshev";
import { vop } from "./vop.js";

/**
 * Computes the Chebyshev distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const distChebyshev: MultiVecOpRoVV<number> = vop(0);
distChebyshev.default($distChebyshev)
distChebyshev.add(2, distChebyshev2);
distChebyshev.add(3, distChebyshev3);
distChebyshev.add(4, distChebyshev4);