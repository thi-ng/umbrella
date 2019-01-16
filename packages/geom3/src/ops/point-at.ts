import { defmulti } from "@thi.ng/defmulti";
import { cossin, fit01, TAU } from "@thi.ng/math";
import {
    cartesian2,
    madd2,
    maddN,
    mixN2,
    Vec
} from "@thi.ng/vectors3";
import {
    Arc,
    Circle,
    Ellipse,
    IShape,
    Line,
    Polygon,
    Ray,
    Rect,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { Sampler } from "../internal/sampler";
import { vertices } from "./vertices";

export const pointAt = defmulti<IShape, number, Vec>(dispatch);

pointAt.addAll({

    [Type.ARC]:
        ($: Arc, t: number) =>
            $.pointAtTheta(fit01(t, $.start, $.end)),

    [Type.CIRCLE]:
        ($: Circle, t) =>
            cartesian2(null, [$.r, TAU * t], $.pos),

    [Type.ELLIPSE]:
        ($: Ellipse, t) =>
            madd2([], $.pos, cossin(TAU * t), $.r),

    [Type.LINE]:
        ({ points }: Line, t) =>
            mixN2([], points[0], points[1], t),

    [Type.POLYGON]:
        ($: Polygon, t) =>
            new Sampler($.points, true).pointAt(t),

    [Type.POLYLINE]:
        ($: Polygon, t) =>
            new Sampler($.points).pointAt(t),

    [Type.RAY]:
        ($: Ray, t) =>
            maddN([], $.pos, $.dir, t),

    [Type.RECT]:
        ($: Rect, t) =>
            new Sampler(vertices($), true).pointAt(t),

});

pointAt.isa(Type.QUAD, Type.POLYGON);
pointAt.isa(Type.TRIANGLE, Type.POLYGON);
