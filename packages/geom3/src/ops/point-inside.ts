import { defmulti } from "@thi.ng/defmulti";
import { distSq, ReadonlyVec } from "@thi.ng/vectors3";
import {
    Circle,
    IShape,
    Rect,
    Type,
    Polygon,
    AABB
} from "../api";
import { dispatch } from "../internal/dispatch";
import { polyPointInside } from "../internal/poly-point-inside";

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

    [Type.POLYGON]:
        ($: Polygon, p) =>
            polyPointInside($.points, p) > 0,

    [Type.RECT]:
        ({ pos, size }: Rect, [x, y]: ReadonlyVec) =>
            x >= pos[0] && x <= pos[0] + size[0] &&
            y >= pos[1] && y <= pos[1] + size[1],

});

pointInside.isa(Type.SPHERE, Type.CIRCLE);
pointInside.isa(Type.QUAD, Type.POLYGON);
