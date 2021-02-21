import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
    pointInAABB,
    pointInCircle,
    pointInPolygon2,
    pointInRect,
    pointInSegment,
    pointInTriangle2,
} from "@thi.ng/geom-isec";
import { isInArray, ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { AABB } from "../api/aabb";
import type { Circle } from "../api/circle";
import type { Line } from "../api/line";
import type { Points } from "../api/points";
import type { Polygon } from "../api/polygon";
import type { Rect } from "../api/rect";
import type { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";

export const pointInside = defmulti<IShape, ReadonlyVec, boolean>(dispatch);

pointInside.addAll(<IObjectOf<Implementation2<unknown, ReadonlyVec, boolean>>>{
    aabb: ($: AABB, p: ReadonlyVec) => pointInAABB(p, $.pos, $.size),

    circle: ($: Circle, p) => pointInCircle(p, $.pos, $.r),

    line: ($: Line, p) => pointInSegment(p, $.points[0], $.points[1]),

    points: ({ points }: Points, p) => isInArray(p, points),

    poly: ($: Polygon, p) => pointInPolygon2(p, $.points) > 0,

    rect: ($: Rect, p: ReadonlyVec) => pointInRect(p, $.pos, $.size),

    tri: (tri: Triangle, p: ReadonlyVec) =>
        pointInTriangle2(p, ...(<[Vec, Vec, Vec]>tri.points)),
});

pointInside.isa("points3", "points");
pointInside.isa("quad", "poly");
pointInside.isa("sphere", "circle");
