import type { Attribs, IHiccupShape3 } from "./api.js";
import { Group3 } from "./api/group3.js";

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
export const group3 = (
	attribs: Attribs = {},
	children?: Iterable<IHiccupShape3>
) => new Group3(attribs, children);
