import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Points } from "./api/points.js";

export const points = (pts?: Iterable<Vec>, attribs?: Attribs) =>
	new Points(pts, attribs);
