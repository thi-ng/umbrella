import { Attribs, IShape } from "../api";

export const withAttribs = <T extends IShape>(
    shape: T,
    attribs: Attribs,
    replace = true
) => {
    shape.attribs = replace ? attribs : { ...shape.attribs, ...attribs };
    return shape;
};
