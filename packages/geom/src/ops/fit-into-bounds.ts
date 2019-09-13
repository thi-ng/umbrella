import { IShape } from "@thi.ng/geom-api";
import {
    concat,
    ReadonlyMat,
    scale23,
    translation23
} from "@thi.ng/matrices";
import {
    div2,
    neg,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";
import { Rect } from "../api/rect";
import { collBounds } from "../internal/coll-bounds";
import { bounds } from "./bounds";
import { center } from "./center";
import { centroid } from "./centroid";
import { mapPoint } from "./map-point";
import { transform } from "./transform";
import { unmapPoint } from "./unmap-point";

const translateScale2 = (
    shape: IShape,
    c1: ReadonlyVec,
    c2: ReadonlyVec,
    smat: ReadonlyMat
) =>
    transform(
        shape,
        concat(translation23([], c1), smat, translation23([], c2))
    );

export const fitIntoBounds2 = (shape: IShape, dest: Rect) => {
    const src = <Rect>bounds(shape);
    if (!src) return;
    const c = centroid(src);
    if (!c) return;
    const tscale = div2([], dest.size, src.size);
    const scale = Math.min(tscale[0], tscale[1]);
    return translateScale2(
        shape,
        centroid(dest)!,
        neg(null, c),
        scale23([], scale)
    );
};

export const fitAllIntoBounds2 = (shapes: IShape[], dest: Rect) => {
    const sbraw = collBounds(shapes, bounds);
    if (!sbraw) return;
    const src = new Rect(...sbraw);
    const [w, h] = div2([], dest.size, src.size);
    const s = w > 0 && h > 0 ? Math.min(w, h) : w > 0 ? w : h;
    const smat = scale23([], s);
    const b = center(transform(src, smat), centroid(dest))!;
    const c1: Vec = [];
    const c2: Vec = [];
    const res: IShape[] = [];
    for (let i = shapes.length; --i >= 0; ) {
        const s = shapes[i];
        const sc = centroid(s, c1);
        if (sc) {
            unmapPoint(b, mapPoint(src, sc), c2);
            res.push(translateScale2(s, c2, neg(null, c1), smat));
        } else {
            res.push(s);
        }
    }
    return res;
};
