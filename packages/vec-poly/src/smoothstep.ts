import type { MultiVecOpVVV } from "./api.js";
import { smoothStep as $smoothStep } from "@thi.ng/vec-nd/smoothstep";
import { smoothStep2 } from "@thi.ng/vec2/smoothstep";
import { smoothStep3 } from "@thi.ng/vec3/smoothstep";
import { smoothStep4 } from "@thi.ng/vec4/smoothstep";
import { vop } from "./vop.js";

/**
 * Componentwise computes GLSL `smoothstep()` for given nD vector `c` and using
 * "edge" vectors `a` and `b`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep: MultiVecOpVVV = vop(1);
smoothStep.default($smoothStep)
smoothStep.add(2, smoothStep2);
smoothStep.add(3, smoothStep3);
smoothStep.add(4, smoothStep4);