import type { IShape } from "@thi.ng/geom-api";
import { minNonZero2, minNonZero3, safeDiv } from "@thi.ng/math";
import {
    concat,
    MatOpNV,
    MatOpV,
    scale23,
    scale44,
    translation23,
    translation44,
} from "@thi.ng/matrices";
import { neg, ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { AABB } from "../api/aabb";
import { Rect } from "../api/rect";
import { collBounds } from "../internal/coll-bounds";
import { bounds } from "./bounds";
import { center } from "./center";
import { centroid } from "./centroid";
import { mapPoint } from "./map-point";
import { transform } from "./transform";
import { unmapPoint } from "./unmap-point";

const translateScale = (
    tmat: MatOpV,
    smat: MatOpNV,
    shape: IShape,
    preTrans: ReadonlyVec,
    postTrans: ReadonlyVec,
    scale: ReadonlyVec | number
) =>
    transform(
        shape,
        concat([], tmat([], postTrans), smat([], scale), tmat([], preTrans))
    );

export const fitIntoBounds2 = (shape: IShape, dest: Rect) => {
    const src = <Rect>bounds(shape);
    if (!src) return;
    const c = centroid(src);
    if (!c) return;
    return translateScale(
        translation23,
        scale23,
        shape,
        neg(null, c),
        centroid(dest)!,
        minNonZero2(
            safeDiv(dest.size[0], src.size[0]),
            safeDiv(dest.size[1], src.size[1])
        )
    );
};

export const fitIntoBounds3 = (shape: IShape, dest: AABB) => {
    const src = <AABB>bounds(shape);
    if (!src) return;
    const c = centroid(src);
    if (!c) return;
    return translateScale(
        translation44,
        scale44,
        shape,
        neg(null, c),
        centroid(dest)!,
        minNonZero3(
            safeDiv(dest.size[0], src.size[0]),
            safeDiv(dest.size[1], src.size[1]),
            safeDiv(dest.size[2], src.size[2])
        )
    );
};

export const fitAllIntoBounds2 = (shapes: IShape[], dest: Rect) => {
    const sbraw = collBounds(shapes, bounds);
    if (!sbraw) return;
    const src = new Rect(...sbraw);
    const sx = safeDiv(dest.size[0], src.size[0]);
    const sy = safeDiv(dest.size[1], src.size[1]);
    const scale = sx > 0 ? (sy > 0 ? Math.min(sx, sy) : sx) : sy;
    const smat = scale23([], scale);
    const b = center(transform(src, smat), centroid(dest))!;
    const c1: Vec = [];
    const c2: Vec = [];
    const res: IShape[] = [];
    for (let i = shapes.length; --i >= 0; ) {
        const s = shapes[i];
        const sc = centroid(s, c1);
        if (sc) {
            unmapPoint(b, mapPoint(src, sc), c2);
            res.push(
                translateScale(
                    translation23,
                    scale23,
                    s,
                    neg(null, c1),
                    c2,
                    smat
                )
            );
        } else {
            res.push(s);
        }
    }
    return res;
};
