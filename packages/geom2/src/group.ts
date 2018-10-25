import { implementations } from "@thi.ng/defmulti";
import {
    area,
    Attribs,
    bounds,
    Group2,
    Shape,
    Type
} from "./api";
import { collBounds } from "./internal/bounds";

export function group(attribs?: Attribs, ...children: Shape[]) {
    return new Group2(attribs, ...children);
}

implementations(
    Type.GROUP,

    area,
    (g: Group2) => area(bounds(g)),

    bounds,
    (g: Group2) => collBounds(g.children),
);
