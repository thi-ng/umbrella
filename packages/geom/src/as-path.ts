import type { Attribs, IShape } from "@thi.ng/geom-api";
import { asCubic } from "./as-cubic.js";
import { __copyAttribs } from "./internal/copy.js";
import { pathFromCubics } from "./path.js";

/**
 * Converts given shape into a {@link Path} (via {@link asCubic} and
 * {@link pathFromCubics}).
 *
 * @param src
 * @param attribs
 */
export const asPath = (src: IShape, attribs?: Attribs) =>
    pathFromCubics(asCubic(src), attribs || __copyAttribs(src));
