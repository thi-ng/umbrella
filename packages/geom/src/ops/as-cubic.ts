import type { IObjectOf } from "@thi.ng/api";
import type { Implementation1, MultiFn1O } from "@thi.ng/defmulti";
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
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
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
        polyCubic(
            $,
            opts,
            closedCubicFromBreakPoints,
            closedCubicFromControlPoints
        ),

    polyline: ($: Polyline, opts: Partial<CubicOpts> = {}) =>
        polyCubic(
            $,
            opts,
            openCubicFromBreakPoints,
            openCubicFromControlPoints
        ),

    quadratic: ({ attribs, points }: Quadratic) => [
        cubicFromQuadratic(points[0], points[1], points[2], { ...attribs }),
    ],

    rect: ($: Rect, opts?: Partial<CubicOpts>) => asCubic(asPolygon($), opts),
});

asCubic.isa("ellipse", "circle");
asCubic.isa("quad", "poly");
asCubic.isa("tri", "poly");

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
