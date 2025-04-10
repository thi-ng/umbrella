import { step } from "@thi.ng/math/step";
import { defOpVV } from "./defop.js";

/**
 * Componentwise computes GLSL `step()` for given 2D vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step2 = defOpVV(step, 2);
