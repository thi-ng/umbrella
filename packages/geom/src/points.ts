import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Points, Points3 } from "./api/points";

export const points = (pts?: Vec[], attribs?: Attribs) =>
    new Points(pts, attribs);

export const points3 = (pts?: Vec[], attribs?: Attribs) =>
    new Points3(pts, attribs);
