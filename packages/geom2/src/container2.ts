import { Vec } from "@thi.ng/vectors2/api";
import {
    Attribs,
    bounds,
    PointContainer,
    Rect2,
    Type,
    vertices,
    centroid
} from "./api";
import { bounds as _bounds } from "./internal/bounds";
import { centroid as _centroid } from "./internal/centroid";
import { implementations } from "@thi.ng/defmulti";
import { Vec2 } from "@thi.ng/vectors2/vec2";

export function points(points: Vec[], attribs?: Attribs) {
    return new PointContainer(Type.POINTS2, points, attribs);
};

implementations(
    Type.POINTS2,

    bounds,
    (x: PointContainer) =>
        Rect2.fromMinMax(..._bounds(x.points, [...Vec2.MAX], [...Vec2.MIN])),

    centroid,
    (x: PointContainer) => _centroid(x.points),

    vertices,
    (x: PointContainer) => x.points
);
