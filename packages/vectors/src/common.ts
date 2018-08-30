import { ReadonlyVec, Vec, VecOp2 } from "./api";
import { EPS, eqDelta1 } from "./math";

export const x = (v: ReadonlyVec, i = 0, _?: number) => v[i];
export const y = (v: ReadonlyVec, i = 0, s = 1) => v[i + s];
export const z = (v: ReadonlyVec, i = 0, s = 1) => v[i + 2 * s];
export const w = (v: ReadonlyVec, i = 0, s = 1) => v[i + 3 * s];

/**
 * Applies vector op `fn` to all raw vectors in array `a`, using raw
 * vector `b` as 2nd argument for each iteration. Assumes `fn` writes
 * results back into `a` and no copying is performed.
 *
 * ```
 * transformVectors1(
 *   v.add3,
 *   [1, 2, 3, 0, 4, 5, 6, 0],
 *   [10, 20, 30],
 *   2, 0, 0, 1, 1, 4
 * )
 * // [ 11, 22, 33, 0, 14, 25, 36, 0 ]
 * ```
 *
 * @param fn op
 * @param a array to process
 * @param b vector operand
 * @param num num elements
 * @param ia start index `a`
 * @param ib start index `b`
 * @param csa component stride `a`
 * @param csb component stride `b`
 * @param esa element stride `a`
 */
export const transformVectors1 = (fn: VecOp2<any>, a: Vec, b: ReadonlyVec, num: number, ia: number, ib: number, csa: number, csb: number, esa: number) => {
    for (; num > 0; num-- , ia += esa) {
        fn(a, b, ia, ib, csa, csb);
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
export const transformVectors2 = (fn: VecOp2<any>, a: Vec, b: ReadonlyVec, n: number, ia: number, ib: number, csa: number, csb: number, esa: number, esb: number) => {
    for (; n > 0; n-- , ia += esa, ib += esb) {
        fn(a, b, ia, ib, csa, csb);
    }
    return a;
};

export const equiv = (a: ReadonlyVec, b: ReadonlyVec, n: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; n > 0; n-- , ia += sa, ib += sb) {
        if (a[ia] !== b[ib]) {
            return false;
        }
    }
    return true;
};

export const eqDelta = (a: ReadonlyVec, b: ReadonlyVec, n: number, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; n > 0; n-- , ia += sa, ib += sb) {
        if (!eqDelta1(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};

export const declareIndices = (proto: any, indices: number[]) => {
    const get = (i: number) => function () { return this.buf[this.i + i * this.s]; };
    const set = (i: number) => function (n: number) { this.buf[this.i + i * this.s] = n; };
    indices.forEach((i) => {
        Object.defineProperty(proto, i, {
            get: get(i),
            set: set(i),
            enumerable: true,
        });
        Object.defineProperty(proto, "xyzw"[i], {
            get: get(i),
            set: set(i),
            enumerable: true,
        });
    });
};
