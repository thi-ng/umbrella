import type { MultiVecOpVV } from "./api.js";
import { step as $step } from "@thi.ng/vec-nd/step";
import { step2 } from "@thi.ng/vec2/step";
import { step3 } from "@thi.ng/vec3/step";
import { step4 } from "@thi.ng/vec4/step";
import { vop } from "./vop.js";

/**
 * Componentwise computes GLSL `step()` for given nD vector `b` and "edge"
 * vectors `a`.
 * 
 * @remarks
 * Multi-method, auto-delegates to optimized versions where possible.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step: MultiVecOpVV = vop(1);
step.default($step)
step.add(2, step2);
step.add(3, step3);
step.add(4, step4);