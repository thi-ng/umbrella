import type { Attribs } from "@thi.ng/geom-api";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Polygon } from "./api/polygon.js";

export const complexPolygon = (
	boundary?: Polygon,
	children?: Iterable<Polygon>,
	attribs?: Attribs
) => new ComplexPolygon(boundary, children, attribs);
