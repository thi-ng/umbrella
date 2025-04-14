import { defOpVNew } from "./defopv-new.js";

const [a, b, c, d] = defOpVNew<number, number>((x) => x >>> 0, 1);

/**
 * Componentwise converts given nD vector to unsigned integer. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec = a;

/**
 * Componentwise converts given 2D vector to unsigned integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec2 = b;
/**
 * Componentwise converts given 3D vector to unsigned integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec3 = c;

/**
 * Componentwise converts given 4D vector to unsigned integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec4 = d;
