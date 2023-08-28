import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { Group } from "./api/group.js";

export const group = (
	attribs: Attribs = {},
	children?: Iterable<IHiccupShape>
) => new Group(attribs, children);
