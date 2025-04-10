import { remainder } from "@thi.ng/math/libc";
import { defOpVN, defOpVV } from "./defop.js";

/**
 * Componentwise computes modulo of given 3D vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a /
 * b)`. Also see {@link mod3}, {@link fmod3}.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder3 = defOpVV(remainder);

/**
 * Same as {@link remainder3}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN3 = defOpVN(remainder);
