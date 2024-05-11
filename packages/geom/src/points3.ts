import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Points3 } from "./api/points3.js";

export const points3 = (pts?: Iterable<Vec>, attribs?: Attribs) =>
	new Points3(pts, attribs);
