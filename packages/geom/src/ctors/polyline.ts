import { Polyline } from "../api/polyline";
import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export const polyline = (pts: Vec[], attribs?: Attribs) =>
    new Polyline(pts, attribs);
