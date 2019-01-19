import { defmulti } from "@thi.ng/defmulti";
import { clamp01 } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors3";
import {
    Cubic,
    IShape,
    Line,
    Polyline,
    Quadratic,
    Type
} from "../api";
import { closestCoeff } from "../internal/closest-point";
import { copyPoints } from "../internal/copy-points";
import { dispatch } from "../internal/dispatch";
import { Sampler } from "../internal/sampler";
import { splitCubicNear, splitLine, splitQuadraticNear } from "../internal/split";

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
            splitCubicNear(p, points[0], points[1], points[2], points[3])
                .map((pts) => new Cubic(pts, { ...attribs })),

    [Type.LINE]:
        ($: Line, p) => {
            const t = closestCoeff(p, $.points[0], $.points[1]) || 0;
            return splitLine($.points[0], $.points[1], clamp01(t))
                .map((pts) => new Line(pts, { ...$.attribs }));
        },

    [Type.POLYLINE]:
        ($: Polyline, p) =>
            new Sampler($.points)
                .splitNear(p)
                .map((pts) => new Polyline(copyPoints(pts), { ...$.attribs })),

    [Type.QUADRATIC]:
        ({ points, attribs }: Quadratic, p) =>
            splitQuadraticNear(p, points[0], points[1], points[2])
                .map((pts) => new Quadratic(pts, { ...attribs })),

});
