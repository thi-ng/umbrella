import { add, normalize, ReadonlyVec, sub, Vec } from "@thi.ng/vectors";

export const closestPointCircle = (
    p: ReadonlyVec,
    c: ReadonlyVec,
    r: number,
    out: Vec = []
) => add(out, c, normalize(out, sub(out, p, c), r));

export const closestPointSphere = closestPointCircle;
