import { mod as op } from "@thi.ng/math/prec";
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(op);

/**
 * Componentwise computes modulo of given nD vector. Similar to {@link fmod},
 * {@link remainder}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a, b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod = a;

/**
 * Componentwise computes modulo of given 2D vector. Similar to {@link fmod2},
 * {@link remainder2}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod2 = b;

/**
 * Componentwise computes modulo of given 3D vector. Similar to {@link fmod3},
 * {@link remainder3}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod3 = c;

/**
 * Componentwise computes modulo of given 4D vector. Similar to {@link fmod4},
 * {@link remainder4}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod4 = d;
