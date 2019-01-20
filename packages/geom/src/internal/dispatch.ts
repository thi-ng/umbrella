import { IShape } from "../api";

export const dispatch = (x: IShape) => x.type;

export const dispatch2 = (a: IShape, b: IShape) => a.type + "-" + b.type;
