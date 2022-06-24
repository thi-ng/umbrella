import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { CubicOpts, IShape, PCLike } from "@thi.ng/geom-api";
import {
    closedCubicFromBreakPoints,
    openCubicFromBreakPoints,
} from "@thi.ng/geom-splines/cubic-from-breakpoints";
import {
    closedCubicFromControlPoints,
    openCubicFromControlPoints,
} from "@thi.ng/geom-splines/cubic-from-controlpoints";
import { TAU } from "@thi.ng/math/api";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Circle } from "./api/circle.js";
import { Cubic } from "./api/cubic.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Polyline } from "./api/polyline.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Rect } from "./api/rect.js";
import { arc } from "./arc.js";
import { asPolygon } from "./as-polygon.js";
import { cubicFromArc, cubicFromLine, cubicFromQuadratic } from "./cubic.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Converts given shape into an array of {@link Cubic} curves.
 *
 * @remarks
 * Currently implemented for:
 *
 * - Arc
 * - Circle
 * - Cubic
 * - Ellipse
 * - Group
 * - Line
 * - Path
 * - Polygon
 * - Polyline
 * - Quad
 * - Quadratic
 * - Rect
 * - Triangle
 */
export const asCubic: MultiFn1O<IShape, Partial<CubicOpts>, Cubic[]> = defmulti(
    __dispatch,
    {
        ellipse: "circle",
        quad: "poly",
        tri: "poly",
    },
    {
        arc: cubicFromArc,

        circle: ($: Circle) => asCubic(arc($.pos, $.r, 0, 0, TAU, true, true)),

        cubic: ($: Cubic) => [$],

        group: ($: Group) => [...mapcat(asCubic, $.children)],

        line: ({ attribs, points }: Line) => [
            cubicFromLine(points[0], points[1], { ...attribs }),
        ],

        path: ($: Path) => [
            ...mapcat((s) => (s.geo ? asCubic(s.geo) : null), $.segments),
        ],

        poly: ($: Polygon, opts: Partial<CubicOpts> = {}) =>
            __polyCubic(
                $,
                opts,
                closedCubicFromBreakPoints,
                closedCubicFromControlPoints
            ),

        polyline: ($: Polyline, opts: Partial<CubicOpts> = {}) =>
            __polyCubic(
                $,
                opts,
                openCubicFromBreakPoints,
                openCubicFromControlPoints
            ),

        quadratic: ({ attribs, points }: Quadratic) => [
            cubicFromQuadratic(points[0], points[1], points[2], { ...attribs }),
        ],

        rect: ($: Rect, opts?: Partial<CubicOpts>) =>
            asCubic(asPolygon($), opts),
    }
);

/**
 * @internal
 */
// prettier-ignore
const __polyCubic = (
    $: PCLike,
    opts: Partial<CubicOpts>,
    breakPoints: (pts: ReadonlyVec[], t?: number, uniform?: boolean) => Vec[][],
    controlPoints: (pts: ReadonlyVec[], t?: number, uniform?: boolean) => Vec[][]
) => {
    opts = { breakPoints: false, scale: 1 / 3, uniform: false, ...opts };
    return (opts.breakPoints
        ? breakPoints($.points, opts.scale, opts.uniform)
        : controlPoints($.points, opts.scale, opts.uniform)
    ).map((pts) => new Cubic(pts, __copyAttribs($)));
};
