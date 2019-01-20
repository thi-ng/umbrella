import { Vec } from "@thi.ng/vectors";
import { Attribs, Polyline } from "../api";

export const polyline =
    (pts: Vec[], attribs?: Attribs) =>
        new Polyline(pts, attribs);
