import { Attribs, Points } from "../api";
import { Vec } from "@thi.ng/vectors";

export const points = (pts?: Vec[], attribs?: Attribs) =>
    new Points(pts, attribs);
