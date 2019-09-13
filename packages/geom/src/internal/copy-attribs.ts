import { Attribs, IShape } from "@thi.ng/geom-api";

export const copyAttribs = ($: IShape) => <Attribs>{ ...$.attribs };
