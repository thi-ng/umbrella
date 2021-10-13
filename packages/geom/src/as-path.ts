import type { Attribs, IShape } from "@thi.ng/geom-api";
import { asCubic } from "./as-cubic.js";
import { __copyAttribs } from "./internal/copy.js";
import { pathFromCubics } from "./path.js";

export const asPath = (src: IShape, attribs?: Attribs) =>
    pathFromCubics(asCubic(src), attribs || __copyAttribs(src));
