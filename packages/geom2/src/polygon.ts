import { Polygon2, Attribs, Type, bounds } from "./api";
import { Vec } from "@thi.ng/vectors2/api";
import { convexHull2 } from "./internal/graham-scan";

export function polygon(points: Vec[], attribs?: Attribs): Polygon2 {
    return new Polygon2(points, attribs);
}

const type = Type.POLYGON2;

bounds.isa(type, Type.POINTS2);

export const convexHull = (poly: Polygon2) =>
    convexHull2(poly.points);
