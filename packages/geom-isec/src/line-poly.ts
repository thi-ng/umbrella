import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import { maddN2, mag, normalize, ReadonlyVec, sub, Vec } from "@thi.ng/vectors";
import { NONE } from "./api";
import { intersectRayLine } from "./ray-line";

export const intersectLinePolylineAll = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    pts: ReadonlyVec[],
    closed = false
): IntersectionResult => {
    const dir = sub([], b, a);
    const maxD = mag(dir);
    normalize(null, dir);
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
        const d = intersectRayLine(a, dir, i, j).alpha;
        if (d !== undefined && d >= 0 && d <= maxD) {
            res.push([d, maddN2([], dir, d, a)]);
        }
    }
    return res.length
        ? {
              type: IntersectionType.INTERSECT,
              isec: res.sort((a, b) => a[0] - b[0]).map((x) => x[1]),
          }
        : NONE;
};
