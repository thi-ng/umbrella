import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { Polygon3 } from "./api/polygon3.js";

export const polygon3 = (pts?: Iterable<Vec>, attribs?: Attribs) =>
	new Polygon3(pts, attribs);
