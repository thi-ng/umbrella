import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { normalize as _norm } from "@thi.ng/vectors/normalize";
import { Ray } from "../api/ray";

export const ray = (pos: Vec, dir: Vec, attribs?: Attribs, normalize = true) =>
    new Ray(pos, normalize ? _norm(null, dir) : dir, attribs);
