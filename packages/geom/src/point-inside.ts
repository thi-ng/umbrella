import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
    pointInAABB,
    pointInCircle,
    pointInPolygon2,
    pointInRect,
    pointInSegment,
    pointInTriangle2,
} from "@thi.ng/geom-isec/point";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { isInArray } from "@thi.ng/vectors/eqdelta";
import type { AABB } from "./api/aabb.js";
import type { Circle } from "./api/circle.js";
import type { Line } from "./api/line.js";
import type { Points } from "./api/points.js";
import type { Polygon } from "./api/polygon.js";
import type { Rect } from "./api/rect.js";
import type { Triangle } from "./api/triangle.js";
import { __dispatch } from "./internal/dispatch.js";

export const pointInside: MultiFn2<IShape, ReadonlyVec, boolean> = defmulti<
    any,
    ReadonlyVec,
    boolean
>(
    __dispatch,
    {
        points3: "points",
        quad: "poly",
        sphere: "circle",
    },
    {
        aabb: ($: AABB, p: ReadonlyVec) => pointInAABB(p, $.pos, $.size),

        circle: ($: Circle, p) => pointInCircle(p, $.pos, $.r),

        line: ($: Line, p) => pointInSegment(p, $.points[0], $.points[1]),

        points: ({ points }: Points, p) => isInArray(p, points),

        poly: ($: Polygon, p) => pointInPolygon2(p, $.points) > 0,

        rect: ($: Rect, p: ReadonlyVec) => pointInRect(p, $.pos, $.size),

        tri: (tri: Triangle, p: ReadonlyVec) =>
            pointInTriangle2(p, ...(<[Vec, Vec, Vec]>tri.points)),
    }
);
