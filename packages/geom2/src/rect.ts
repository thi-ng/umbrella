import { implementations } from "@thi.ng/defmulti";
import { addNew, maddNewN, Vec } from "@thi.ng/vectors2/api";
import { Vec2, vec2 } from "@thi.ng/vectors2/vec2";
import {
    arcLength,
    area,
    asPolygon,
    Attribs,
    bounds,
    centroid,
    Polygon2,
    Rect2,
    Type,
    union,
    vertices
} from "./api";
import { unionBounds } from "./internal/bounds";

export function rect(pos: Vec, size: Vec, attribs?: Attribs): Rect2 {
    return new Rect2(pos, size, attribs);
}

implementations(
    Type.RECT2,

    area,
    (x: Rect2) => x.size[0] * x.size[1],

    arcLength,
    (x: Rect2) => 2 * (x.size[0] + x.size[1]),

    asPolygon,
    (x: Rect2) => new Polygon2(vertices(x), { ...x.attribs }),

    bounds,
    (x: Rect2) => x,

    centroid,
    (x: Rect2, o = vec2()) => maddNewN(x.pos, x.size, 0.5, o),

    union,
    (r1: Rect2, r2: Rect2) =>
        new Rect2(...unionBounds(r1.pos, r1.size, r2.pos, r2.size)),

    vertices,
    (x: Rect2) => {
        const p = x.pos;
        const q = <Vec2>addNew(p, x.size, vec2());
        return [p.copy(), vec2(q.x, p.y), q, vec2(p.x, q.y)];
    }
);
