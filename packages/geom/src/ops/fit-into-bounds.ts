import { IShape } from "@thi.ng/geom-api";
import {
    concat,
    ReadonlyMat,
    scale23,
    translation23,
    translation44,
    scale44,
    mulV344
} from "@thi.ng/matrices";
import {
    div2,
    neg,
    ReadonlyVec,
    Vec,
    MAX3,
    MIN3,
    abs3,
    sub3
} from "@thi.ng/vectors";
import { Rect } from "../api/rect";
import { collBounds } from "../internal/coll-bounds";
import { bounds } from "./bounds";
import { center } from "./center";
import { centroid } from "./centroid";
import { mapPoint } from "./map-point";
import { transform } from "./transform";
import { unmapPoint } from "./unmap-point";
import { isArray, isNull } from "@thi.ng/checks";
import { safeDiv } from "@thi.ng/math";
import {
    bounds as boundsPoints,
    centroid as centroidPoints
} from "@thi.ng/geom-poly-utils";

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

/**
 * Transform an array of 3d points by a 4x4 matrix.
 *
 * @param out
 * @param pts
 * @param mat
 * @returns out
 */
export function transformV344(
    out: Vec[],
    pts: ReadonlyVec[],
    mat: ReadonlyMat
) {
    if (isNull(out)) {
        out = pts;
    }

    if (isArray(out) && out.length === 0) {
        out = pts.map((_) => [0, 0, 0]);
    }

    if (!isArray(out)) {
        throw new Error("transform3 out must me an array or null");
    }

    if (isArray(out) && out.length !== pts.length) {
        throw new Error(
            `transform3: out must be an array with the the same length of input array`
        );
    }

    pts.forEach((point, i) => mulV344(out[i], mat, point));
    return out;
}

const translateScale3 = (
    out: Vec[],
    pts: Vec[],
    c1: ReadonlyVec,
    c2: ReadonlyVec,
    scaleMat: ReadonlyMat
) =>
    /* prettier-ignore */
    transformV344(
      out,
      pts,
      concat(
        [],
        translation44([], c1),
        scaleMat,
        translation44([], c2)
      )
    );

/**
 * Fit a 3d point array into a 3d bounding box.
 *
 * @param out
 * @param pts
 * @param dest
 */
export const fitIntoBounds3 = (out: Vec[], pts: Vec[], dest: Vec[]) => {
    const src = boundsPoints(pts, [...MAX3], [...MIN3]);
    if (!src) return;

    const c = centroidPoints(src);
    if (!c) return;

    const dsize = abs3(null, sub3([], dest[1], dest[0]));
    const ssize = abs3(null, sub3([], src[1], src[0]));
    const tscale = [
        safeDiv(dsize[0], ssize[0]),
        safeDiv(dsize[1], ssize[1]),
        safeDiv(dsize[2], ssize[2])
    ];

    return translateScale3(
        out,
        pts,
        centroidPoints(dest)!,
        neg(null, c),
        scale44([], tscale)
    );
};
