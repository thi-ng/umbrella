import { addmN } from "./addmn";
import { addW4 } from "./addw";
import { ReadonlyVec, Vec } from "./api";
import { submN } from "./submn";

/**
 * Vector version of thi.ng/math `mixCubicHermite`.
 *
 * @param out
 * @param a
 * @param ta
 * @param b
 * @param tb
 * @param t
 */
export const mixCubicHermite = (
    out: Vec | null,
    a: ReadonlyVec,
    ta: ReadonlyVec,
    b: ReadonlyVec,
    tb: ReadonlyVec,
    t: number
) => {
    const s = t - 1;
    const t2 = t * t;
    const s2 = s * s;
    return addW4(
        out,
        a,
        ta,
        b,
        tb,
        (1 + 2 * t) * s2,
        t * s2,
        t2 * (3 - 2 * t),
        t2 * s
    );
};

/**
 * Convenience version of `mixCubicHermite`, using 4 input points and
 * `tangentCardinal` to compute the tangents for points `b` and `c`
 * (with optional `scale`, default 0.5). Interpolated result point is
 * that of `b` and `c`, with `a` and `d` only being used for tangent
 * calculations.
 *
 * If `out` is null, stores result in `b`.
 *
 * @param out
 * @param a
 * @param b
 * @param c
 * @param d
 * @param t
 * @param scale
 */
export const mixHermiteCardinal = (
    out: Vec | null,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    t: number,
    scale = 0.5
) =>
    mixCubicHermite(
        out,
        b,
        tangentCardinal([], a, c, scale),
        c,
        tangentCardinal([], b, d, scale),
        t
    );

/**
 * Convenience version of `mixCubicHermite`, using 4 input points and
 * `tangentDiff3` to compute the tangents for points `b` and `c`.
 * Interpolated result point is that of `b` and `c`, with `a` and `d`
 * only being used for tangent calculations.
 *
 * If `out` is null, stores result in `b`.
 *
 * @param out
 * @param a
 * @param b
 * @param c
 * @param d
 * @param t
 */
export const mixHermiteDiff3 = (
    out: Vec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    t: number
) =>
    mixCubicHermite(
        out,
        b,
        tangentDiff3([], a, b, c),
        c,
        tangentDiff3([], b, c, d),
        t
    );

/**
 * Vector version of thi.ng/math `tangentCardinal`.
 *
 * @param out
 * @param prev
 * @param next
 * @param scale
 * @param ta
 * @param tc
 */
export const tangentCardinal = (
    out: Vec,
    prev: ReadonlyVec,
    next: ReadonlyVec,
    scale = 0.5,
    ta = 0,
    tc = 2
) => submN(out, next, prev, scale / (tc - ta));

/**
 * Vector version of thi.ng/math `tangentDiff3`.
 *
 * @param out
 * @param prev
 * @param curr
 * @param next
 * @param ta
 * @param tb
 * @param tc
 */
export const tangentDiff3 = (
    out: Vec,
    prev: ReadonlyVec,
    curr: ReadonlyVec,
    next: ReadonlyVec,
    ta = 0,
    tb = 1,
    tc = 2
) =>
    addmN(
        out,
        submN(out, curr, prev, 1 / (tb - ta)),
        submN([], next, curr, 1 / (tc - tb)),
        0.5
    );
