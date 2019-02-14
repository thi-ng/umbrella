import { Attribs } from "@thi.ng/geom-api";
import { Vec } from "@thi.ng/vectors";
import { Polyline } from "../api";

export const polyline =
    (pts: Vec[], attribs?: Attribs) =>
        new Polyline(pts, attribs);
