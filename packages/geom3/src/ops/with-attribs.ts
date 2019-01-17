import { Attribs, IShape } from "../api";

export const withAttribs =
    (shape: IShape, attribs: Attribs, replace = true) => {
        shape.attribs = replace ? attribs : { ...shape.attribs, ...attribs };
        return shape;
    };
