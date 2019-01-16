import { IHiccupShape, Attribs, Group } from "../api";

export const group =
    (children: IHiccupShape[], attribs?: Attribs) =>
        new Group(children, attribs);
