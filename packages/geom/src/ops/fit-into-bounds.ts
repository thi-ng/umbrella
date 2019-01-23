import {
    concat,
    ReadonlyMat,
    scale23,
    translation23
} from "@thi.ng/matrices";
import { div2, neg, ReadonlyVec } from "@thi.ng/vectors";
import { IShape, Rect } from "../api";
import { collBounds } from "../internal/coll-bounds";
import { bounds } from "./bounds";
import { center } from "./center";
import { centroid } from "./centroid";
import { mapPoint } from "./map-point";
import { transform } from "./transform";
import { unmapPoint } from "./unmap-point";

const translateScale2 =
    (shape: IShape, c1: ReadonlyVec, c2: ReadonlyVec, smat: ReadonlyMat) =>
        transform(
            shape,
            concat(
                translation23([], c1),
                smat,
                translation23([], c2)
            )
        );

export const fitIntoBounds2 =
    (shape: IShape, dest: Rect) => {
        const src = <Rect>bounds(shape);
        const tscale = div2([], dest.size, src.size);
        const scale = Math.min(tscale[0], tscale[1]);
        return translateScale2(
            shape,
            centroid(dest),
            neg(null, centroid(src)),
            scale23([], scale)
        );
    };

export const fitAllIntoBounds2 =
    (shapes: IShape[], dest: Rect) => {
        const src = new Rect(...collBounds(shapes, bounds));
        const [w, h] = div2([], dest.size, src.size);
        const s = w > 0 && h > 0 ? Math.min(w, h) : w > 0 ? w : h;
        const smat = scale23([], s);
        const b = center(transform(src, smat), centroid(dest));
        const c1 = [];
        const c2 = [];
        const res: IShape[] = [];
        for (let i = shapes.length; --i >= 0;) {
            const s = shapes[i];
            unmapPoint(b, mapPoint(src, centroid(s, c1)), c2);
            res.push(translateScale2(s, c2, neg(null, c1), smat));
        }
        return res;
    };
