import { defmulti } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { pointInPoly2, pointInTriangle2 } from "@thi.ng/geom-poly-utils";
import {
    distSq,
    isInArray,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";
import {
    AABB,
    Circle,
    Points,
    Polygon,
    Rect,
    Triangle
} from "../api";
import { dispatch } from "../internal/dispatch";

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
            isInArray(p, points),

    [Type.POLYGON]:
        ($: Polygon, p) =>
            pointInPoly2($.points, p) > 0,

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
