import { fit01, minError } from "@thi.ng/math";
import { distSq2, ReadonlyVec, Vec } from "@thi.ng/vectors";
import { pointAtTheta } from "./point-at";

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
    const fn = (t: number) => pointAtTheta(o, r, axis, fit01(t, start, end), out);
    return fn(minError(fn, distSq2, p, res, iter));
};
