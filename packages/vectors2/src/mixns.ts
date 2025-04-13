import { mix } from "@thi.ng/math/mix";
import { defOpSVVN } from "./defopsvvn.js";

const [a, b, c, d] = defOpSVVN(mix);

/**
 * Componentwise nD strided vector linear interpolation with uniform scalar.
 * `o = a + (b - a) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const mixNS = a;

/**
 * Componentwise 2D strided vector linear interpolation with uniform scalar.
 * `o = a + (b - a) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const mixNS2 = b;

/**
 * Componentwise 3D strided vector linear interpolation with uniform scalar.
 * `o = a + (b - a) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const mixNS3 = c;

/**
 * Componentwise 4D strided vector linear interpolation with uniform scalar.
 * `o = a + (b - a) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const mixNS4 = d;
