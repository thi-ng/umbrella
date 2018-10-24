import { addNew, maddNewN, Vec } from "@thi.ng/vectors2/api";
import { Vec2, vec2 } from "@thi.ng/vectors2/vec2";
import {
    arcLength,
    area,
    Attribs,
    bounds,
    centroid,
    Rect2,
    Type,
    vertices
} from "./api";

export function rect2(pos: Vec, size: Vec, attribs?: Attribs): Rect2 {
    return new Rect2(pos, size, attribs);
}

area.add(Type.RECT2, (x: Rect2) => x.size[0] * x.size[1]);

arcLength.add(Type.RECT2, (x: Rect2) => 2 * (x.size[0] + x.size[1]));

bounds.add(Type.RECT2, (x: Rect2) => x);

centroid.add(Type.RECT2, (x: Rect2) => maddNewN(x.pos, x.size, 0.5));

vertices.add(Type.RECT2, (x: Rect2) => {
    const p = x.pos;
    const q = <Vec2>addNew(p, x.size, vec2());
    return [p.copy(), vec2(q.x, p.y), q, vec2(p.x, q.y)];
});
