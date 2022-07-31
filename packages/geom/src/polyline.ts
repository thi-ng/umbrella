import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Polyline } from "./api/polyline.js";

export const polyline = (pts: Vec[], attribs?: Attribs) =>
	new Polyline(pts, attribs);
