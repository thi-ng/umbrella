import { fit01 as op } from "@thi.ng/math/fit";
import { defOpVVV } from "./defopvvv.js";

const [a, b, c, d] = defOpVVV(op);

/**
 * Componentwise maps given nD vector `a` from the closed `[0,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit01 = a;

/**
 * Componentwise maps given 2D vector `a` from the closed `[0,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit01_2 = b;

/**
 * Componentwise maps given 3D vector `a` from the closed `[0,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit01_3 = c;

/**
 * Componentwise maps given 4D vector `a` from the closed `[0,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit01_4 = d;
