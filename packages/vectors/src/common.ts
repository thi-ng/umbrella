import { EPS } from "@thi.ng/math/api";
import { eqDelta as _eqDelta } from "@thi.ng/math/eqdelta";
import {
    ReadonlyVec,
    ReadonlyVecOp1,
    Vec,
    VecOp2,
    VecOp2o
} from "./api";

export const x: ReadonlyVecOp1<number> = (v: ReadonlyVec, i = 0) => v[i];
export const y: ReadonlyVecOp1<number> = (v: ReadonlyVec, i = 0, s = 1) => v[i + s];
export const z: ReadonlyVecOp1<number> = (v: ReadonlyVec, i = 0, s = 1) => v[i + 2 * s];
export const w: ReadonlyVecOp1<number> = (v: ReadonlyVec, i = 0, s = 1) => v[i + 3 * s];

export function* $iter(buf: Vec, n: number, i = 0, s = 1) {
    for (; n > 0; n-- , i += s) {
        yield buf[i];
    }
}

/**
 * Applies vector op `fn` to all raw vectors in array `a`, using the
 * same raw vector `b` as 2nd argument for each iteration. Assumes `fn`
 * writes results back into `a` and no other copying is performed.
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
 * @param a vector array to process
 * @param b vector operand
 * @param num num elements
 * @param esa element stride `a`
 * @param ia start index `a`
 * @param ib start index `b`
 * @param csa component stride `a`
 * @param csb component stride `b`
 */
export const transformVectors1 = (
    fn: VecOp2<any>, a: Vec, b: ReadonlyVec, num: number,
    esa: number,
    ia = 0, ib = 0,
    csa = 1, csb = 1) => {
    for (; num > 0; num-- , ia += esa) {
        fn(a, b, ia, ib, csa, csb);
    }
    return a;
};

/**
 * Similar to `transformVectors1`, but for ops which don't modify `a` or
 * `b` and instead write result into given `out` vector, which is then
 * also returned.
 *
 * @param fn
 * @param out
 * @param a
 * @param b
 * @param num
 * @param eso
 * @param esa
 * @param io
 * @param ia
 * @param ib
 * @param cso
 * @param csa
 * @param csb
 */
export const transformVectors1o = (
    fn: VecOp2o<any>, out: Vec, a: ReadonlyVec, b: ReadonlyVec, num: number,
    eso: number, esa: number,
    io = 0, ia = 0, ib = 0,
    cso = 1, csa = 1, csb = 1) => {
    for (; num > 0; num-- , io += eso, ia += esa) {
        fn(out, a, b, io, ia, ib, cso, csa, csb);
    }
    return out;
};

/**
 * Similar to `transformVectors1` but also traverses vector `b` array,
 * i.e. applies `fn` to 1st vector of `a` and `b`, then to 2nd `a` and
 * `b` etc.
 *
 * @param fn
 * @param a
 * @param b
 * @param n
 * @param esa
 * @param esb
 * @param ia
 * @param ib
 * @param csa
 * @param csb
 */
export const transformVectors2 = (
    fn: VecOp2<any>, a: Vec, b: ReadonlyVec, n: number,
    esa: number, esb: number,
    ia = 0, ib = 0,
    csa = 1, csb = 1) => {
    for (; n > 0; n-- , ia += esa, ib += esb) {
        fn(a, b, ia, ib, csa, csb);
    }
    return a;
};

/**
 * Similar to `transformVectors2`, but for ops which don't modify `a` or
 * `b` and instead write result into given `out` vector, which is then
 * also returned.
 *
 * @param fn
 * @param out
 * @param a
 * @param b
 * @param n
 * @param eso
 * @param esa
 * @param esb
 * @param io
 * @param ia
 * @param ib
 * @param cso
 * @param csa
 * @param csb
 */
export const transformVectors2o = (
    fn: VecOp2o<any>, out: Vec, a: ReadonlyVec, b: ReadonlyVec, n: number,
    eso: number, esa: number, esb: number,
    io = 0, ia = 0, ib = 0,
    cso = 1, csa = 1, csb = 1) => {
    for (; n > 0; n-- , io += eso, ia += esa, ib += esb) {
        fn(out, a, b, io, ia, ib, cso, csa, csb);
    }
    return out;
};

/**
 * Takes 2 vectors `a` and `b`, their offsets and strides, returns true
 * if the first `n` elements are equal.
 *
 * @param a
 * @param b
 * @param n
 * @param ia
 * @param ib
 * @param sa
 * @param sb
 */
export const equiv = (a: ReadonlyVec, b: ReadonlyVec, n: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; n > 0; n-- , ia += sa, ib += sb) {
        if (a[ia] !== b[ib]) {
            return false;
        }
    }
    return true;
};

/**
 * Similar to `equiv()`, but takes tolerance `eps` into account for
 * equality checks.
 *
 * @param a first vector
 * @param b second vector
 * @param n number of elements
 * @param eps tolerance
 * @param ia start index a
 * @param ib start index b
 * @param sa stride a
 * @param sb stride b
 */
export const eqDelta = (a: ReadonlyVec, b: ReadonlyVec, n: number, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; n > 0; n-- , ia += sa, ib += sb) {
        if (!_eqDelta(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};
