import { Vec } from "@thi.ng/vectors2/api";
import { Vec2 } from "@thi.ng/vectors2/vec2";
import {
    Attribs,
    bounds,
    PointContainer,
    Rect2,
    Type,
    vertices
} from "./api";
import { bounds as _bounds } from "./internal/bounds";
import { implementations } from "@thi.ng/defmulti";

export function points(points: Vec[], attribs?: Attribs) {
    return new PointContainer<Vec2>(Type.POINTS2, points, attribs);
};

implementations(
    Type.POINTS2,

    bounds,
    (x: PointContainer<Vec2>) => {
        const b = _bounds(x.points, Vec2.MAX.copy(), Vec2.MIN.copy());
        return Rect2.fromMinMax(b[0], b[1]);
    },

    vertices,
    (x: PointContainer<Vec2>) => x.points
);
