import type { IShape } from "@thi.ng/geom-api";
import { minNonZero2, minNonZero3 } from "@thi.ng/math/interval";
import { safeDiv } from "@thi.ng/math/safe-div";
import type { MatOpNV, MatOpV } from "@thi.ng/matrices";
import { concat } from "@thi.ng/matrices/concat";
import { scale23, scale44 } from "@thi.ng/matrices/scale";
import { translation23, translation44 } from "@thi.ng/matrices/translation";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { neg } from "@thi.ng/vectors/neg";
import type { AABB } from "./api/aabb.js";
import { Rect } from "./api/rect.js";
import { bounds } from "./bounds.js";
import { center } from "./center.js";
import { centroid } from "./centroid.js";
import { __collBounds } from "./internal/bounds.js";
import { mapPoint } from "./map-point.js";
import { transform } from "./transform.js";
import { unmapPoint } from "./unmap-point.js";

/** @internal */
const __translateScale = (
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

/**
 * Uniformly rescales & repositions given 2D `shape` such that it fits into
 * destination bounds. Returns transformed copy of `shape`.
 *
 * @param shape
 * @param dest
 */
export const fitIntoBounds2 = (shape: IShape, dest: Rect) => {
    const src = <Rect>bounds(shape);
    if (!src) return;
    const c = centroid(src);
    if (!c) return;
    return __translateScale(
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

/**
 * 3D version of {@link fitIntoBounds2}.
 *
 * @param shape
 * @param dest
 */
export const fitIntoBounds3 = (shape: IShape, dest: AABB) => {
    const src = <AABB>bounds(shape);
    if (!src) return;
    const c = centroid(src);
    if (!c) return;
    return __translateScale(
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

/**
 * Version of {@link fitIntoBounds2} for multiple source shapes.
 *
 * @param shapes
 * @param dest
 */
export const fitAllIntoBounds2 = (shapes: IShape[], dest: Rect) => {
    const sbraw = __collBounds(shapes, bounds);
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
    for (let i = shapes.length; i-- > 0; ) {
        const s = shapes[i];
        const sc = centroid(s, c1);
        if (sc) {
            unmapPoint(b, mapPoint(src, sc), c2);
            res.push(
                __translateScale(
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
