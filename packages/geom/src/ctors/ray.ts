import { normalize as _norm, Vec } from "@thi.ng/vectors";
import { Ray } from "../api/ray";
import type { Attribs } from "@thi.ng/geom-api";

export const ray = (pos: Vec, dir: Vec, attribs?: Attribs, normalize = true) =>
    new Ray(pos, normalize ? _norm(null, dir) : dir, attribs);
