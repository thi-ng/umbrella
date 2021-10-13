import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Text } from "./api/text.js";

export const text = (pos: Vec, body: any, attribs?: Attribs) =>
    new Text(pos, body, attribs);
