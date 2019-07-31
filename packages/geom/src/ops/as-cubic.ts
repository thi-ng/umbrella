import { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1, MultiFn1O } from "@thi.ng/defmulti";
import { CubicOpts, IShape, Type } from "@thi.ng/geom-api";
import { closedCubicFromBreakPoints, closedCubicFromControlPoints, cubicFromArc } from "@thi.ng/geom-splines";
import { TAU } from "@thi.ng/math";
import { mapcat } from "@thi.ng/transducers";
import {
    Arc,
    Circle,
    Cubic,
    Group,
    Line,
    Path,
    Polygon,
    Quadratic,
    Rect
} from "../api";
import { arc } from "../ctors/arc";
import { cubicFromLine, cubicFromQuadratic } from "../ctors/cubic";
import { dispatch } from "../internal/dispatch";
import { asPolygon } from "./as-polygon";

export const asCubic: MultiFn1O<IShape, Partial<CubicOpts>, Cubic[]> = defmulti(
    dispatch
);

asCubic.addAll(<IObjectOf<Implementation1<unknown, Cubic[]>>>{
    [Type.ARC]: ($: Arc) =>
        cubicFromArc($.pos, $.r, $.axis, $.start, $.end).map(
            (c) => new Cubic(c, $.attribs)
        ),

    [Type.CIRCLE]: ($: Circle) =>
        asCubic(arc($.pos, $.r, 0, 0, TAU, true, true)),

    [Type.CUBIC]: ($: Cubic) => [$],

    [Type.GROUP]: ($: Group) => [...mapcat(asCubic, $.children)],

    [Type.LINE]: ({ attribs, points }: Line) => [
        cubicFromLine(points[0], points[1], { ...attribs })
    ],

    [Type.PATH]: ($: Path) => [
        ...mapcat((s) => (s.geo ? asCubic(s.geo) : null), $.segments)
    ],

    [Type.POLYGON]: ($: Polygon, opts: Partial<CubicOpts> = {}) => {
        opts = { breakPoints: false, scale: 1 / 3, uniform: false, ...opts };
        return (opts.breakPoints
            ? closedCubicFromBreakPoints($.points, opts.scale, opts.uniform)
            : closedCubicFromControlPoints($.points, opts.scale, opts.uniform)
        ).map((pts) => new Cubic(pts, { ...$.attribs }));
    },

    [Type.QUADRATIC]: ({ attribs, points }: Quadratic) => [
        cubicFromQuadratic(points[0], points[1], points[2], { ...attribs })
    ],

    [Type.RECT]: ($: Rect, opts?) => asCubic(asPolygon($), opts)
});

asCubic.isa(Type.ELLIPSE, Type.CIRCLE);
