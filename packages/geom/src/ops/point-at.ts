import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import { cossin, fit01, TAU } from "@thi.ng/math";
import {
    cartesian2,
    madd2,
    mixCubic,
    mixN2,
    mixQuadratic,
    pointAtOnRay,
    Vec,
} from "@thi.ng/vectors";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Cubic } from "../api/cubic";
import { Ellipse } from "../api/ellipse";
import { Line } from "../api/line";
import { Polygon } from "../api/polygon";
import { Quadratic } from "../api/quadratic";
import { Ray } from "../api/ray";
import { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";
import type { IObjectOf } from "@thi.ng/api";

export const pointAt = defmulti<IShape, number, Vec>(dispatch);

pointAt.addAll(<IObjectOf<Implementation2<unknown, number, Vec>>>{
    [Type.ARC]: ($: Arc, t: number) => $.pointAtTheta(fit01(t, $.start, $.end)),

    [Type.CIRCLE]: ($: Circle, t) => cartesian2(null, [$.r, TAU * t], $.pos),

    [Type.CUBIC]: ({ points }: Cubic, t) =>
        mixCubic([], points[0], points[1], points[2], points[3], t),

    [Type.ELLIPSE]: ($: Ellipse, t) => madd2([], cossin(TAU * t), $.r, $.pos),

    [Type.LINE]: ({ points }: Line, t) => mixN2([], points[0], points[1], t),

    [Type.POLYGON]: ($: Polygon, t) => new Sampler($.points, true).pointAt(t),

    [Type.POLYLINE]: ($: Polygon, t) => new Sampler($.points).pointAt(t),

    [Type.QUADRATIC]: ({ points }: Quadratic, t) =>
        mixQuadratic([], points[0], points[1], points[2], t),

    [Type.RAY]: ($: Ray, t) => pointAtOnRay([], $.dir, t, $.pos),

    [Type.RECT]: ($: Rect, t) => new Sampler(vertices($), true).pointAt(t),
});

pointAt.isa(Type.QUAD, Type.POLYGON);
pointAt.isa(Type.TRIANGLE, Type.POLYGON);
