import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { Group } from "./api/group.js";

/**
 * Creates a group with given attribs and child shapes (nested groups are
 * supported).
 *
 * @remarks
 * Use the special `__inkscapeLayer` control attrib to declare the group as an
 * Inkscape layer and the given value as layer name (only relevant and used when
 * later converted to SVG).
 *
 * @param attribs
 * @param children
 */
export const group = (
	attribs: Attribs = {},
	children?: Iterable<IHiccupShape>
) => new Group(attribs, children);
