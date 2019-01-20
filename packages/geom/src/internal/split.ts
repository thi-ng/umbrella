import { mixN, set, Vec, ReadonlyVec, mixCubic, mixQuadratic } from "@thi.ng/vectors";
import { VecPair } from "../api";
import { partial } from "@thi.ng/compose";
import { findClosestT } from "./closest-point";

export const splitLine =
    (a: Vec, b: Vec, t: number): [VecPair, VecPair] => {
        const p = mixN([], a, b, t);
        return [[a, p], [set([], p), b]];
    };

export const splitCubic =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, t: number) => {
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : d;
            const c1 = [set([], p), set([], p), set([], p), set([], p)];
            const c2 = [set([], a), set([], b), set([], c), set([], d)];
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixN([], a, b, t);
        const bc = mixN([], b, c, t);
        const cd = mixN([], c, d, t);
        const abc = mixN([], ab, bc, t);
        const bcd = mixN([], bc, cd, t);
        const p = mixN([], abc, bcd, t);
        return [
            [set([], a), ab, abc, set([], p)],
            [p, bcd, cd, set([], d)]
        ];
    };

export const splitQuadratic =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, t: number) => {
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : c;
            const c1 = [set([], p), set([], p), set([], p)];
            const c2 = [set([], a), set([], b), set([], c)];
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixN([], a, b, t);
        const bc = mixN([], b, c, t);
        const p = mixN([], ab, bc, t);
        return [[set([], a), ab, p], [p, bc, set([], c)]];
    };

export const splitCubicNear = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    res?: number,
    iter?: number
) =>
    splitCubic(
        a, b, c, d,
        findClosestT(
            partial(mixCubic, [], a, b, c, d),
            p,
            res,
            iter
        )
    );

export const splitQuadraticNear = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    res?: number,
    iter?: number
) =>
    splitQuadratic(
        a, b, c,
        findClosestT(
            partial(mixQuadratic, [], a, b, c),
            p,
            res,
            iter
        )
    );
