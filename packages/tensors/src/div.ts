import { $div } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT($div);

/**
 * Componentwise nD tensor division. Writes result to `out`. If `out` is null,
 * mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const div = a;

/**
 * Componentwise 1D tensor division. Writes result to `out`. If `out` is null,
 * mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const div1 = b;

/**
 * Componentwise 2D tensor division. Writes result to `out`. If `out` is null,
 * mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const div2 = c;

/**
 * Componentwise 3D tensor division. Writes result to `out`. If `out` is null,
 * mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const div3 = d;
