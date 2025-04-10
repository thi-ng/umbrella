import { step } from "@thi.ng/math/step";
import { defOpVV } from "./defop.js";

/**
 * Componentwise computes GLSL `step()` for given 3D vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step3 = defOpVV(step, 2);
