import type { Dual } from "./api";
import { add, div, dual, mul, sub } from "./ops";

/**
 * Dual vector addition. Applies {@link add} in a component-wise manner. Returns
 * new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vadd = (a: Dual[], b: Dual[]): Dual[] =>
    a.map((a, i) => add(a, b[i]));

/**
 * Dual vector subtraction. Applies {@link sub} in a component-wise manner.
 * Returns new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vsub = (a: Dual[], b: Dual[]): Dual[] =>
    a.map((a, i) => sub(a, b[i]));

/**
 * Dual vector multiplication. Applies {@link mul} in a component-wise manner.
 * Returns new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vmul = (a: Dual[], b: Dual[]): Dual[] =>
    a.map((a, i) => mul(a, b[i]));

/**
 * Dual vector division. Applies {@link div} in a component-wise manner.
 * Returns new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vdiv = (a: Dual[], b: Dual[]): Dual[] =>
    a.map((a, i) => div(a, b[i]));

/**
 * Computes dot product of 2 dual vectors.
 *
 * @param a
 * @param b
 */
export const dot = (a: Dual[], b: Dual[]): Dual =>
    a.reduce((acc, a, i) => add(acc, mul(a, b[i])), dual(0, a[0].length));
