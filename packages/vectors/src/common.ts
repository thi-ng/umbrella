import { ReadonlyVec, Vec, VecOp } from "./api";

export const x = (v: ReadonlyVec, i = 0, _?) => v[i];
export const y = (v: ReadonlyVec, i = 0, s = 1) => v[i + s];
export const z = (v: ReadonlyVec, i = 0, s = 1) => v[i + 2 * s];
export const w = (v: ReadonlyVec, i = 0, s = 1) => v[i + 3 * s];

/**
 *
 * @param fn op
 * @param a array to process
 * @param b vector operand
 * @param n num elements
 * @param ia start index `a`
 * @param ib start index `b`
 * @param csa component stride `a`
 * @param csb component stride `b`
 * @param esa element stride `a`
 */
export const sliceOp1 = (fn: VecOp, a: Vec, b: ReadonlyVec, n: number, ia = 0, ib = 0, csa = 1, csb = 1, esa = 2) => {
    for (let i = ia; n > 0; n-- , i += esa) {
        fn(a, b, i, ib, csa, csb);
    }
    return a;
};
