import { fit01 } from "@thi.ng/math/fit";
import { minError } from "@thi.ng/math/min-error";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { distSq2 } from "@thi.ng/vectors/distsq";
import { pointAtTheta } from "./point-at.js";

export const closestPoint = (
    p: ReadonlyVec,
    o: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    start: number,
    end: number,
    out: Vec = [],
    res?: number,
    iter?: number
) => {
    const fn = (t: number) =>
        pointAtTheta(o, r, axis, fit01(t, start, end), out);
    return fn(minError(fn, distSq2, p, res, iter));
};
