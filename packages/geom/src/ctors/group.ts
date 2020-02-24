import { Group } from "../api/group";
import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";

export const group = (attribs: Attribs = {}, children?: IHiccupShape[]) =>
    new Group(attribs, children);
