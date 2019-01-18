import { maddN2, ReadonlyVec } from "@thi.ng/vectors3";
import { IntersectionType } from "../api";
import { intersectRayLine } from "./ray-line";

export const intersectRayPolyline =
    (rpos: ReadonlyVec, dir: ReadonlyVec, pts: ReadonlyVec[], closed = false) => {
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
            const d = intersectRayLine(rpos, dir, i, j);
            if (d !== undefined) {
                cross++;
                if (d < minD) minD = d;
            }
        }
        return cross > 0 ?
            {
                type: IntersectionType.INTERSECT,
                isec: maddN2([], rpos, dir, minD),
                dist: minD,
                inside: !(cross & 1)
            } :
            {
                type: IntersectionType.NONE
            };
    };

export const intersectRayPolylineAll =
    (rpos: ReadonlyVec, dir: ReadonlyVec, pts: ReadonlyVec[], closed = false) => {
        const n = pts.length - 1;
        let i, j;
        if (closed) {
            i = pts[n];
            j = pts[0];
        } else {
            i = pts[0];
            j = pts[1];
        }
        const res = [];
        for (let k = 0; k <= n; i = j, j = pts[++k]) {
            const d = intersectRayLine(rpos, dir, i, j);
            if (d !== undefined) {
                res.push([d, maddN2([], rpos, dir, d)]);
            }
        }
        return res.sort((a, b) => a[0] - b[0]);
    };
