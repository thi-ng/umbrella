import { Attribs } from "@thi.ng/geom-api";
import { Vec } from "@thi.ng/vectors";
import { Polyline } from "../api/polyline";

export const polyline = (pts: Vec[], attribs?: Attribs) =>
    new Polyline(pts, attribs);
