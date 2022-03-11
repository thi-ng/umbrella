import type { IShape } from "@thi.ng/geom-api";
import { bounds2 } from "@thi.ng/geom-poly-utils/bounds";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import type { BPatch } from "./api/bpatch.js";
import type { Rect } from "./api/rect.js";
import { mapPoint } from "./map-point.js";
import { rectFromMinMax } from "./rect.js";
import { unmapPoint } from "./unmap-point.js";

export const warpPoints = (pts: ReadonlyVec[], dest: IShape, src: IShape) => {
    const res: Vec[] = [];
    for (let n = pts.length, i = 0; i < n; i++) {
        res.push(unmapPoint(dest, mapPoint(src, pts[i])));
    }
    return res;
};

export const warpPointsBPatch = (
    pts: ReadonlyVec[],
    dest: BPatch,
    src?: Rect,
    out: Vec[] = []
) => {
    src = src || rectFromMinMax(...bounds2(pts));
    for (let i = pts.length; i-- > 0; ) {
        out[i] = dest.unmapPoint(mapPoint(src, pts[i]));
    }
    return out;
};
