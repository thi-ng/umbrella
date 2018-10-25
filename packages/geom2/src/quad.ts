import { Quad2, Attribs, bounds, Type, centroid, area, vertices } from "./api";
import { Vec } from "@thi.ng/vectors2/api";

export function quad(points: Vec[], attribs?: Attribs): Quad2 {
    return new Quad2(points, attribs);
}

const type = Type.QUAD2;

area.isa(type, Type.POLYGON2);
bounds.isa(type, Type.POINTS2);
centroid.isa(type, Type.POLYGON2);
vertices.isa(type, Type.POINTS2);
