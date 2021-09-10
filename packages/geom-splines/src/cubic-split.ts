import { minError } from "@thi.ng/math/min-error";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { distSq } from "@thi.ng/vectors/distsq";
import { mixCubic } from "@thi.ng/vectors/mix-cubic";
import { mixN } from "@thi.ng/vectors/mixn";
import { set } from "@thi.ng/vectors/set";

export const cubicSplitAt = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    t: number
) => {
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
        [p, bcd, cd, set([], d)],
    ];
};

export const splitCubicNearPoint = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    res?: number,
    iter?: number
) =>
    cubicSplitAt(
        a,
        b,
        c,
        d,
        minError(
            (t: number) => mixCubic([], a, b, c, d, t),
            distSq,
            p,
            res,
            iter
        )
    );
