import { defmulti } from "@thi.ng/defmulti";
import { closestT } from "@thi.ng/geom-closest-point";
import { Sampler } from "@thi.ng/geom-resample";
import { quadraticSplitNearPoint, splitCubicNearPoint } from "@thi.ng/geom-splines";
import { clamp01 } from "@thi.ng/math";
import { copyVectors, ReadonlyVec } from "@thi.ng/vectors";
import {
    Cubic,
    IShape,
    Line,
    Polyline,
    Quadratic,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { splitLine } from "../internal/split";

/**
 * Similar to `splitAt`, but instead of taking a normalized parametric
 * split position, splits the given curve at the closest point to `p`.
 * Returns tuple of split shapes of same type as `shape`.
 *
 * Implemented for:
 *
 * - Cubic
 * - Line
 * - Polyline
 * - Quadratic
 *
 * @see splitAt
 *
 * @param shape
 * @param p
 */
export const splitNearPoint = defmulti<IShape, ReadonlyVec, IShape[]>(dispatch);

splitNearPoint.addAll({

    [Type.CUBIC]:
        ({ points, attribs }: Cubic, p) =>
            splitCubicNearPoint(p, points[0], points[1], points[2], points[3])
                .map((pts) => new Cubic(pts, { ...attribs })),

    [Type.LINE]:
        ($: Line, p) => {
            const t = closestT(p, $.points[0], $.points[1]) || 0;
            return splitLine($.points[0], $.points[1], clamp01(t))
                .map((pts) => new Line(pts, { ...$.attribs }));
        },

    [Type.POLYLINE]:
        ($: Polyline, p) =>
            new Sampler($.points)
                .splitNear(p)
                .map((pts) => new Polyline(copyVectors(pts), { ...$.attribs })),

    [Type.QUADRATIC]:
        ({ points, attribs }: Quadratic, p) =>
            quadraticSplitNearPoint(p, points[0], points[1], points[2])
                .map((pts) => new Quadratic(pts, { ...attribs })),

});
