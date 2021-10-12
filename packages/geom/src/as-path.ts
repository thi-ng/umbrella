import type { Attribs, IShape } from "@thi.ng/geom-api";
import { asCubic } from "./as-cubic";
import { __copyAttribs } from "./internal/copy";
import { pathFromCubics } from "./path";

export const asPath = (src: IShape, attribs?: Attribs) =>
    pathFromCubics(asCubic(src), attribs || __copyAttribs(src));
