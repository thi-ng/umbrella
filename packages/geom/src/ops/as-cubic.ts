import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1, MultiFn1O } from "@thi.ng/defmulti";
import { CubicOpts, IShape, PCLike, Type } from "@thi.ng/geom-api";
import {
    closedCubicFromBreakPoints,
    closedCubicFromControlPoints,
    openCubicFromBreakPoints,
    openCubicFromControlPoints,
} from "@thi.ng/geom-splines";
import { TAU } from "@thi.ng/math";
import { mapcat } from "@thi.ng/transducers";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Circle } from "../api/circle";
import { Cubic } from "../api/cubic";
import type { Group } from "../api/group";
import type { Line } from "../api/line";
import type { Path } from "../api/path";
import type { Polygon } from "../api/polygon";
import type { Polyline } from "../api/polyline";
import type { Quadratic } from "../api/quadratic";
import type { Rect } from "../api/rect";
import { arc } from "../ctors/arc";
import {
    cubicFromArc,
    cubicFromLine,
    cubicFromQuadratic,
} from "../ctors/cubic";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { asPolygon } from "./as-polygon";

export const asCubic: MultiFn1O<IShape, Partial<CubicOpts>, Cubic[]> = defmulti(
    dispatch
);

asCubic.addAll(<IObjectOf<Implementation1<unknown, Cubic[]>>>{
    [Type.ARC]: cubicFromArc,

    [Type.CIRCLE]: ($: Circle) =>
        asCubic(arc($.pos, $.r, 0, 0, TAU, true, true)),

    [Type.CUBIC]: ($: Cubic) => [$],

    [Type.GROUP]: ($: Group) => [...mapcat(asCubic, $.children)],

    [Type.LINE]: ({ attribs, points }: Line) => [
        cubicFromLine(points[0], points[1], { ...attribs }),
    ],

    [Type.PATH]: ($: Path) => [
        ...mapcat((s) => (s.geo ? asCubic(s.geo) : null), $.segments),
    ],

    [Type.POLYGON]: ($: Polygon, opts: Partial<CubicOpts> = {}) =>
        polyCubic(
            $,
            opts,
            closedCubicFromBreakPoints,
            closedCubicFromControlPoints
        ),

    [Type.POLYLINE]: ($: Polyline, opts: Partial<CubicOpts> = {}) =>
        polyCubic(
            $,
            opts,
            openCubicFromBreakPoints,
            openCubicFromControlPoints
        ),

    [Type.QUADRATIC]: ({ attribs, points }: Quadratic) => [
        cubicFromQuadratic(points[0], points[1], points[2], { ...attribs }),
    ],

    [Type.RECT]: ($: Rect, opts?: Partial<CubicOpts>) =>
        asCubic(asPolygon($), opts),
});

asCubic.isa(Type.ELLIPSE, Type.CIRCLE);

// prettier-ignore
const polyCubic = (
    $: PCLike,
    opts: Partial<CubicOpts>,
    breakPoints: (pts: ReadonlyVec[], t?: number, uniform?: boolean) => Vec[][],
    controlPoints: (pts: ReadonlyVec[], t?: number, uniform?: boolean) => Vec[][]
) => {
    opts = { breakPoints: false, scale: 1 / 3, uniform: false, ...opts };
    return (opts.breakPoints
        ? breakPoints($.points, opts.scale, opts.uniform)
        : controlPoints($.points, opts.scale, opts.uniform)
    ).map((pts) => new Cubic(pts, copyAttribs($)));
};
