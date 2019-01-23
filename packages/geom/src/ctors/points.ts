import { Attribs } from "@thi.ng/geom-api";
import { Vec } from "@thi.ng/vectors";
import { Points } from "../api";

export const points = (pts?: Vec[], attribs?: Attribs) =>
    new Points(pts, attribs);
