import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import { maddN2, ReadonlyVec, Vec } from "@thi.ng/vectors";
import { NONE } from "./api";
import { intersectRayLine } from "./ray-line";

export const intersectRayPolyline = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    pts: ReadonlyVec[],
    closed = false
): IntersectionResult => {
    const n = pts.length - 1;
    let minD = Infinity;
    let cross = 0;
    let i, j;
    if (closed) {
        i = pts[n];
        j = pts[0];
    } else {
        i = pts[0];
        j = pts[1];
    }
    for (let k = 0; k <= n; i = j, j = pts[++k]) {
        const d = intersectRayLine(rpos, dir, i, j).alpha;
        if (d !== undefined) {
            cross++;
            if (d < minD) minD = d;
        }
    }
    return cross > 0
        ? {
              type: IntersectionType.INTERSECT,
              isec: maddN2([], dir, minD, rpos),
              inside: !(cross & 1),
              alpha: minD,
          }
        : NONE;
};

export const intersectRayPolylineAll = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    pts: ReadonlyVec[],
    closed = false
): IntersectionResult => {
    const n = pts.length - 1;
    let i, j;
    if (closed) {
        i = pts[n];
        j = pts[0];
    } else {
        i = pts[0];
        j = pts[1];
    }
    const res: [number, Vec][] = [];
    for (let k = 0; k <= n; i = j, j = pts[++k]) {
        const d = intersectRayLine(rpos, dir, i, j).alpha;
        if (d !== undefined) {
            res.push([d, maddN2([], dir, d, rpos)]);
        }
    }
    return res.length
        ? {
              type: IntersectionType.INTERSECT,
              isec: res.sort((a, b) => a[0] - b[0]).map((x) => x[1]),
          }
        : NONE;
};
