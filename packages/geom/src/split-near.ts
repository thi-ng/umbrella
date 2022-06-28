import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { closestT } from "@thi.ng/geom-closest-point/line";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { splitCubicNearPoint } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitNearPoint } from "@thi.ng/geom-splines/quadratic-split";
import { clamp01 } from "@thi.ng/math/interval";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { Cubic } from "./api/cubic.js";
import { Line } from "./api/line.js";
import { Polyline } from "./api/polyline.js";
import { Quadratic } from "./api/quadratic.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";
import { __splitLine } from "./internal/split.js";

/**
 * Similar to {@link splitAt}, but instead of taking a normalized parametric
 * split position, splits the given curve at the closest point to `p`.
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link Cubic}
 * - {@link Line}
 * - {@link Polyline}
 * - {@link Quadratic}
 *
 * @param shape - shape to operate on
 * @param p - split point
 */
export const splitNearPoint: MultiFn2<
    IShape,
    ReadonlyVec,
    IShape[] | undefined
> = defmulti<any, ReadonlyVec, IShape[] | undefined>(
    __dispatch,
    {},
    {
        cubic: ({ points, attribs }: Cubic, p) =>
            splitCubicNearPoint(
                p,
                points[0],
                points[1],
                points[2],
                points[3]
            ).map((pts) => new Cubic(pts, { ...attribs })),

        line: ($: Line, p) => {
            const t = closestT(p, $.points[0], $.points[1]) || 0;
            return __splitLine($.points[0], $.points[1], clamp01(t)).map(
                (pts) => new Line(pts, __copyAttribs($))
            );
        },

        polyline: ($: Polyline, p) =>
            __pointArraysAsShapes(
                Polyline,
                new Sampler($.points).splitNear(p),
                $.attribs
            ),

        quadratic: ({ points, attribs }: Quadratic, p) =>
            quadraticSplitNearPoint(p, points[0], points[1], points[2]).map(
                (pts) => new Quadratic(pts, { ...attribs })
            ),
    }
);
