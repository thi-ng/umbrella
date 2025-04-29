import { $add } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

const [a, b, c, d] = defOpTN($add);

/**
 * Componentwise nD tensor addition with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN = a;

/**
 * Componentwise 1D tensor addition with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN1 = b;

/**
 * Componentwise 2D tensor addition with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN2 = c;

/**
 * Componentwise 3D tensor addition with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN3 = d;
