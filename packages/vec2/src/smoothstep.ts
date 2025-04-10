import { smoothStep } from "@thi.ng/math/step";
import { defOpVVV } from "./defop.js";

/**
 * Componentwise computes GLSL `smoothstep()` for given 2D vector `c` and using
 * "edge" vectors `a` and `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep2 = defOpVVV(smoothStep, 2);
