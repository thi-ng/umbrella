import { fract } from "@thi.ng/math/prec";
import { defOpV } from "./defop.js";

/**
 * Componentwise computes fractional parts of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract3 = defOpV(fract);
