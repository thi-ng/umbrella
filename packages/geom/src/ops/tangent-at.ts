import { defmulti } from "@thi.ng/defmulti";
import { Sampler } from "@thi.ng/geom-resample";
import { cossin, HALF_PI, TAU } from "@thi.ng/math";
import { direction, Vec } from "@thi.ng/vectors";
import {
    IShape,
    Line,
    PCLike,
    Rect,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const tangentAt = defmulti<IShape, number, Vec>(dispatch);

tangentAt.addAll({

    [Type.CIRCLE]:
        (_, t) =>
            cossin(TAU * t + HALF_PI),

    [Type.LINE]:
        ({ points }: Line) =>
            direction([], points[0], points[1]),

    [Type.POLYGON]:
        ($: PCLike, t) =>
            new Sampler($.points, true).tangentAt(t),

    [Type.POLYLINE]:
        ($: PCLike, t) =>
            new Sampler($.points).tangentAt(t),

    [Type.RECT]:
        ($: Rect, t) =>
            new Sampler(vertices($), true).tangentAt(t),

});

tangentAt.isa(Type.QUAD, Type.POLYGON);
tangentAt.isa(Type.TRIANGLE, Type.POLYGON);
