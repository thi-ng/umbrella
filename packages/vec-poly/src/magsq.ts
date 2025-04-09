import type { MultiVecOpRoV } from "./api.js";
import { magSq as $magSq } from "@thi.ng/vec-nd/magsq";
import { magSq2 } from "@thi.ng/vec2/magsq";
import { magSq3 } from "@thi.ng/vec3/magsq";
import { magSq4 } from "@thi.ng/vec4/magsq";
import { vop } from "./vop.js";

/**
 * Computes the squared magnitude of given nD vector
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 */
export const magSq: MultiVecOpRoV<number> = vop(0);
magSq.default($magSq)
magSq.add(2, magSq2);
magSq.add(3, magSq3);
magSq.add(4, magSq4);