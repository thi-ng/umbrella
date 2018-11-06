import { ReadonlyVec } from "@thi.ng/vectors2/api";
import { IShape, mapPoint, unmapPoint } from "../api";

export const warpPoints =
    (src: ReadonlyVec[], srcBounds: IShape, dest: IShape) =>
        src.map((p) => unmapPoint(dest, mapPoint(srcBounds, p)));
