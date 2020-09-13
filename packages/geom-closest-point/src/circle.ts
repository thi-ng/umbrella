import { add, direction, ReadonlyVec, Vec } from "@thi.ng/vectors";

export const closestPointCircle = (
    p: ReadonlyVec,
    c: ReadonlyVec,
    r: number,
    out: Vec = []
) => add(out, c, direction(out, c, p, r));

export const closestPointSphere = closestPointCircle;
