import { IShape } from "@thi.ng/geom-api";

export const dispatch = (x: IShape) => x.type;

export const dispatch2 = (a: IShape, b: IShape) => a.type + "-" + b.type;
