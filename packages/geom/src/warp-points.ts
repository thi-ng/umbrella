import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mapPoint } from "./map-point";
import { unmapPoint } from "./unmap-point";

export const warpPoints = (pts: ReadonlyVec[], dest: IShape, src: IShape) => {
    const res: Vec[] = [];
    for (let n = pts.length, i = 0; i < n; i++) {
        res.push(unmapPoint(dest, mapPoint(src, pts[i])));
    }
    return res;
};
