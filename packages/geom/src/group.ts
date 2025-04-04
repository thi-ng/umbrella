// SPDX-License-Identifier: Apache-2.0
import type { GroupAttribs, IHiccupShape2 } from "./api.js";
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
	attribs: GroupAttribs = {},
	children?: Iterable<IHiccupShape2>
) => new Group(attribs, children);
