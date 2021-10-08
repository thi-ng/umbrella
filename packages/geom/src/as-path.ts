import { pathFromCubics } from "./ctors/path";
import { copyAttribs } from "./internal/copy-attribs";
import { asCubic } from "./as-cubic";
import type { Attribs, IShape } from "@thi.ng/geom-api";

export const asPath = (src: IShape, attribs?: Attribs) =>
    pathFromCubics(asCubic(src), attribs || copyAttribs(src));
