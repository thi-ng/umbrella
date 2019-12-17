import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import { MultiVecOp } from "@thi.ng/vectors";

export type MultiIsecOp<T> = MultiVecOp<T> & T;

export const NONE: IntersectionResult = Object.freeze({
    type: IntersectionType.NONE
});
