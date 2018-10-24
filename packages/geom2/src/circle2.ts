import { PI, TAU } from "@thi.ng/math/api";
import { subNewN, Vec } from "@thi.ng/vectors2/api";
import { asVec2, vec2 } from "@thi.ng/vectors2/vec2";
import {
    arcLength,
    area,
    bounds,
    centroid,
    Circle2,
    Type,
    Attribs,
    Rect2,
} from "./api";

export function circle2(pos: Vec, r = 1, attribs?: Attribs): Circle2 {
    return new Circle2(asVec2(pos), r, attribs);
}

area.add(Type.CIRCLE2, (x: Circle2) => PI * x.r * x.r);

arcLength.add(Type.CIRCLE2, (x: Circle2) => TAU * x.r);

bounds.add(Type.CIRCLE2, (x: Circle2) => new Rect2(subNewN(x.pos, x.r), vec2(x.r * 2, x.r * 2)));

centroid.add(Type.CIRCLE2, (x: Circle2) => x.pos);
