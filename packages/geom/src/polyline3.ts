import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Polyline3 } from "./api/polyline3.js";

export const polyline3 = (pts: Iterable<Vec>, attribs?: Attribs) =>
	new Polyline3(pts, attribs);
