import { ReadonlyVec, Vec, VecOp } from "./api";
import { EPS, eqDelta } from "./math";

export const x = (v: ReadonlyVec, i = 0, _?) => v[i];
export const y = (v: ReadonlyVec, i = 0, s = 1) => v[i + s];
export const z = (v: ReadonlyVec, i = 0, s = 1) => v[i + 2 * s];
export const w = (v: ReadonlyVec, i = 0, s = 1) => v[i + 3 * s];

/**
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
export const sliceOp1 = (fn: VecOp, a: Vec, b: ReadonlyVec, n: number, ia: number, ib: number, csa: number, csb: number, esa: number) => {
    for (let i = ia; n > 0; n-- , i += esa) {
        fn(a, b, i, ib, csa, csb);
    }
    return a;
};

/**
 * @param fn
 * @param a
 * @param b
 * @param n
 * @param ia
 * @param ib
 * @param csa
 * @param csb
 * @param esa
 * @param esb
 */
export const sliceOpN = (fn: VecOp, a: Vec, b: ReadonlyVec, n: number, ia: number, ib: number, csa: number, csb: number, esa: number, esb: number) => {
    for (let i = ia, j = ib; n > 0; n-- , i += esa, j += esb) {
        fn(a, b, i, j, csa, csb);
    }
    return a;
};

export const eqDeltaN = (a: Vec, b: Vec, n: number, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; --n >= 0; ia += sa, ib += sb) {
        if (!eqDelta(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};
