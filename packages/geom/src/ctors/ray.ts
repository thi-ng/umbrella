import { Attribs } from "@thi.ng/geom-api";
import { normalize as _norm, Vec } from "@thi.ng/vectors";
import { Ray } from "../api";

export const ray =
    (pos: Vec, dir: Vec, attribs?: Attribs, normalize = true) =>
        new Ray(pos, normalize ? _norm(null, dir) : dir, attribs);
