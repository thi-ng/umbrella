import { minError } from "@thi.ng/math";
import { distSq, mixN, mixQuadratic, ReadonlyVec, set } from "@thi.ng/vectors";

export const quadraticSplitAt = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    t: number
) => {
    if (t <= 0 || t >= 1) {
        const p = t <= 0 ? a : c;
        const c1 = [set([], p), set([], p), set([], p)];
        const c2 = [set([], a), set([], b), set([], c)];
        return t <= 0 ? [c1, c2] : [c2, c1];
    }
    const ab = mixN([], a, b, t);
    const bc = mixN([], b, c, t);
    const p = mixN([], ab, bc, t);
    return [
        [set([], a), ab, p],
        [p, bc, set([], c)],
    ];
};

export const quadraticSplitNearPoint = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    res?: number,
    iter?: number
) =>
    quadraticSplitAt(
        a,
        b,
        c,
        minError(
            (t: number) => mixQuadratic([], a, b, c, t),
            distSq,
            p,
            res,
            iter
        )
    );
