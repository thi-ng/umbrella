import type { FnU2 } from "@thi.ng/api";
import type { Dual, Op2, OpV2 } from "./api";
import { add, div, dual, mul, sub } from "./ops";

const defVecOp2 =
    (op: Op2): OpV2 =>
    (a, b) =>
        a.map((a, i) => op(a, b[i]));

/**
 * Dual vector addition. Applies {@link add} in a component-wise manner. Returns
 * new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vadd = defVecOp2(add);

/**
 * Dual vector subtraction. Applies {@link sub} in a component-wise manner.
 * Returns new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vsub = defVecOp2(sub);

/**
 * Dual vector multiplication. Applies {@link mul} in a component-wise manner.
 * Returns new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vmul = defVecOp2(mul);

/**
 * Dual vector division. Applies {@link div} in a component-wise manner.
 * Returns new (dual) vector.
 *
 * @param a
 * @param b
 */
export const vdiv = defVecOp2(div);

/**
 * Computes dot product of 2 dual vectors.
 *
 * @param a
 * @param b
 */
export const dot: FnU2<Dual[], Dual> = (a, b) =>
    a.reduce((acc, a, i) => add(acc, mul(a, b[i])), dual(0, a[0].length));
