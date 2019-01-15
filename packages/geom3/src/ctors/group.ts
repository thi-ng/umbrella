import { HiccupShape, Attribs, Group } from "../api";

export const group =
    (children: HiccupShape[], attribs?: Attribs) =>
        new Group(children, attribs);
