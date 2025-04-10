import { safeDiv } from "@thi.ng/math/safe-div";
import { defOpVV } from "./defop.js";

/**
 * Componentwise divides given 2D vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv2 = defOpVV(safeDiv);
