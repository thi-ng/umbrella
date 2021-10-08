import { mapPoint } from "./map-point";
import { unmapPoint } from "./unmap-point";
import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export const warpPoints = (pts: ReadonlyVec[], dest: IShape, src: IShape) => {
    const res: Vec[] = [];
    for (let n = pts.length, i = 0; i < n; i++) {
        res.push(unmapPoint(dest, mapPoint(src, pts[i])));
    }
    return res;
};
