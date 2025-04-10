import { fract } from "@thi.ng/math/prec";
import { defOpV } from "./defop.js";

/**
 * Componentwise computes fractional parts of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract2 = defOpV(fract);
