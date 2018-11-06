import { implementations } from "@thi.ng/defmulti";
import {
    area,
    Attribs,
    bounds,
    centroid,
    Group2,
    IShape,
    Type
} from "./api";
import { collBounds } from "./internal/bounds";

export function group(attribs?: Attribs, ...children: IShape[]) {
    return new Group2(attribs, ...children);
}

implementations(
    Type.GROUP,

    area,
    (g: Group2) => area(bounds(g)),

    bounds,
    (g: Group2) => collBounds(g.children),

    centroid,
    (g: Group2) => centroid(bounds(g)),
);
