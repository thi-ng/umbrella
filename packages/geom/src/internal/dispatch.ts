import type { IShape } from "@thi.ng/geom-api";

export const __dispatch = (x: IShape) => x.type;

export const __dispatch2 = (a: IShape, b: IShape) => a.type + "-" + b.type;
