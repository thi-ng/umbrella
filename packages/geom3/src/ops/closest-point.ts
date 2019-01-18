import { defmulti } from "@thi.ng/defmulti";
import {
    add,
    normalize,
    ReadonlyVec,
    sub,
    Vec
} from "@thi.ng/vectors3";
import {
    Circle,
    Cubic,
    IShape,
    Line,
    PCLike,
    Quadratic,
    Type
} from "../api";
import {
    closestPointArray,
    closestPointCubic,
    closestPointPolyline,
    closestPointQuadratic,
    closestPointSegment
} from "../internal/closest-point";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const closestPoint = defmulti<IShape, ReadonlyVec, Vec>(dispatch);

closestPoint.addAll({

    [Type.CIRCLE]:
        ($: Circle, p) =>
            add(null, normalize(null, sub([], p, $.pos), $.r), $.pos),

    [Type.CUBIC]:
        ({ points }: Cubic, p) =>
            closestPointCubic(p, points[0], points[1], points[2], points[3]),

    [Type.LINE]:
        ({ points }: Line, p) =>
            closestPointSegment(p, points[0], points[1]),

    [Type.POLYGON]:
        ($: PCLike, p) =>
            closestPointArray(p, $.points),

    [Type.POLYGON]:
        ($: PCLike, p) =>
            closestPointPolyline(p, $.points, true),

    [Type.POLYLINE]:
        ($: PCLike, p) =>
            closestPointPolyline(p, $.points),

    [Type.QUADRATIC]:
        ({ points }: Quadratic, p) =>
            closestPointQuadratic(p, points[0], points[1], points[2]),

    [Type.RECT]:
        ($, p) =>
            closestPointPolyline(p, vertices($), true),

});

closestPoint.isa(Type.QUAD, Type.POLYGON);
closestPoint.isa(Type.SPHERE, Type.CIRCLE);
closestPoint.isa(Type.TRIANGLE, Type.POLYGON);