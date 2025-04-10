import { mod } from "@thi.ng/math/prec";
import { defOpVN, defOpVV } from "./defop.js";

/**
 * Componentwise computes modulo of given 3D vector. Similar to {@link fmod3},
 * {@link remainder3}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod3 = defOpVV(mod);

/**
 * Same as {@link mod3}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN3 = defOpVN(mod);
