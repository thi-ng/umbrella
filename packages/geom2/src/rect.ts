import { implementations } from "@thi.ng/defmulti";
import {
    addNew,
    copy,
    maddNewN,
    Vec
} from "@thi.ng/vectors2/api";
import {
    arcLength,
    area,
    asPolygon,
    Attribs,
    bounds,
    centroid,
    Polygon2,
    Rect2,
    tessellate,
    Tessellator,
    Type,
    union,
    vertices
} from "./api";
import { unionBounds } from "./internal/bounds";
import { tessellatePoints } from "./tessellate";

export function rect(pos: Vec, size: Vec, attribs?: Attribs) {
    return new Rect2(pos, size, attribs);
}

export const rectFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
    Rect2.fromMinMax(min, max, attribs);

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
    (x: Rect2, o?: Vec) => maddNewN(x.pos, x.size, 0.5, o),

    tessellate,
    (x: Rect2, tessel: Tessellator | Iterable<Tessellator>, iter?: number) =>
        tessellatePoints(vertices(x), <any>tessel, iter),

    union,
    (r1: Rect2, r2: Rect2) =>
        new Rect2(...unionBounds(r1.pos, r1.size, r2.pos, r2.size)),

    vertices,
    (x: Rect2) => {
        const p = x.pos;
        const q = addNew(p, x.size);
        return [copy(p), [q[0], p[1]], q, [p[0], q[1]]];
    }
);
