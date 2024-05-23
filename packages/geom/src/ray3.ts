import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { normalize3 } from "@thi.ng/vectors/normalize";
import { Ray3 } from "./api/ray3.js";

export const ray3 = (pos: Vec, dir: Vec, attribs?: Attribs, normalize = true) =>
	new Ray3(pos, normalize ? normalize3(null, dir) : dir, attribs);
