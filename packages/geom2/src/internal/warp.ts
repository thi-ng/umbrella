import { ReadonlyVec } from "@thi.ng/vectors3";
import { IShape, mapPoint, unmapPoint } from "../api";

export const warpPoints =
    (src: ReadonlyVec[], srcBounds: IShape, dest: IShape) =>
        src.map((p) => unmapPoint(dest, mapPoint(srcBounds, p)));
