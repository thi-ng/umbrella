import { wrap } from "@thi.ng/math/interval";
import { defOpVVV } from "./defop.js";

/**
 * Componentwise folds given 3D vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap3 = defOpVVV(wrap);
