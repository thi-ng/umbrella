import { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { Group } from "../api";

export const group =
    (children: IHiccupShape[], attribs?: Attribs) =>
        new Group(children, attribs);
