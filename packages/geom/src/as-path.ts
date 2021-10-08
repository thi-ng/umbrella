import type { Attribs, IShape } from "@thi.ng/geom-api";
import { asCubic } from "./as-cubic";
import { copyAttribs } from "./internal/copy-attribs";
import { pathFromCubics } from "./path";

export const asPath = (src: IShape, attribs?: Attribs) =>
    pathFromCubics(asCubic(src), attribs || copyAttribs(src));
