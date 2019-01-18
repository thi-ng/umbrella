import { defmulti } from "@thi.ng/defmulti";
import { distSq, ReadonlyVec, Vec } from "@thi.ng/vectors3";
import {
    AABB,
    Circle,
    IShape,
    Points,
    Polygon,
    Rect,
    Triangle,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { pointInArray } from "../internal/point-in-array";
import { polyPointInside } from "../internal/poly-point-inside";
import { pointInTriangle2 } from "../internal/triangle-point-inside";

export const pointInside = defmulti<IShape, ReadonlyVec, boolean>(dispatch);

pointInside.addAll({

    [Type.AABB]:
        ({ pos, size }: AABB, [x, y, z]: ReadonlyVec) =>
            x >= pos[0] && x <= pos[0] + size[0] &&
            y >= pos[1] && y <= pos[1] + size[1] &&
            z >= pos[2] && z <= pos[2] + size[2],

    [Type.CIRCLE]:
        ($: Circle, p) =>
            distSq($.pos, p) <= $.r * $.r,

    [Type.POINTS]:
        ({ points }: Points, p) =>
            pointInArray(points, p),

    [Type.POLYGON]:
        ($: Polygon, p) =>
            polyPointInside($.points, p) > 0,

    [Type.RECT]:
        ({ pos, size }: Rect, [x, y]: ReadonlyVec) =>
            x >= pos[0] && x <= pos[0] + size[0] &&
            y >= pos[1] && y <= pos[1] + size[1],

    [Type.TRIANGLE]:
        (tri: Triangle, p: ReadonlyVec) =>
            pointInTriangle2(p, ...<[Vec, Vec, Vec]>tri.points),
});

pointInside.isa(Type.SPHERE, Type.CIRCLE);
pointInside.isa(Type.QUAD, Type.POLYGON);
