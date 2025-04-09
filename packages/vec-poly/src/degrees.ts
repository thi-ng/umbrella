import type { MultiVecOpV } from "./api.js";
import { degrees as $degrees } from "@thi.ng/vec-nd/degrees";
import { degrees2 } from "@thi.ng/vec2/degrees";
import { degrees3 } from "@thi.ng/vec3/degrees";
import { degrees4 } from "@thi.ng/vec4/degrees";
import { vop } from "./vop.js";

/**
 * Componentwise computes converts radians to degrees of given nD vector. Also
 * see {@link radians}.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees: MultiVecOpV = vop(1);
degrees.default($degrees)
degrees.add(2, degrees2);
degrees.add(3, degrees3);
degrees.add(4, degrees4);