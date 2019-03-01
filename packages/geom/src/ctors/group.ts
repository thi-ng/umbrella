import { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { Group } from "../api";

export const group = (attribs: Attribs = {}, children?: IHiccupShape[]) =>
    new Group(attribs, children);
