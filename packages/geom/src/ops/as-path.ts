import { Attribs, IShape } from "@thi.ng/geom-api";
import { pathFromCubics } from "../ctors/path";
import { asCubic } from "./as-cubic";

export const asPath = (src: IShape, attribs?: Attribs) =>
    pathFromCubics(asCubic(src), attribs);
