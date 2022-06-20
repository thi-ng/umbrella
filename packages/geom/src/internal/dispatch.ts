// thing:export
import type { IShape } from "@thi.ng/geom-api";

/** @internal */
export const __dispatch = (x: IShape) => x.type;

/** @internal */
export const __dispatch2 = (a: IShape, b: IShape) => a.type + "-" + b.type;
