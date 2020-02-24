import type { Attribs, IShape } from "@thi.ng/geom-api";

export const withAttribs = <T extends IShape>(
    shape: T,
    attribs: Attribs,
    replace = true
) => {
    shape.attribs = replace ? attribs : { ...shape.attribs, ...attribs };
    return shape;
};
