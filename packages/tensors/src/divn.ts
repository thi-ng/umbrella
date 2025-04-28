import { $div } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT($div);

/**
 * Componentwise nD tensor division with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const divN = a;

/**
 * Componentwise 1D tensor division with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const divN1 = b;

/**
 * Componentwise 2D tensor division with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const divN2 = c;

/**
 * Componentwise 3D tensor division with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const divN3 = d;
