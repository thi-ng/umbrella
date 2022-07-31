import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { Group } from "./api/group.js";

export const group = (attribs: Attribs = {}, children?: IHiccupShape[]) =>
	new Group(attribs, children);
