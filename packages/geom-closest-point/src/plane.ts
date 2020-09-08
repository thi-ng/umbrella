import { dot, normalize, ReadonlyVec, sub, Vec } from "@thi.ng/vectors";

export const distToPlane = (p: ReadonlyVec, n: ReadonlyVec, w: number) =>
    dot(n, p) - w;

export const closestPointPlane = (
    p: ReadonlyVec,
    normal: ReadonlyVec,
    w: number,
    out: Vec = []
) => sub(out, p, normalize(out, normal, distToPlane(p, normal, w)));
