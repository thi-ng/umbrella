import { atan2Abs } from "@thi.ng/math";
import { ReadonlyVec } from "./api";

export const headingXY = (a: ReadonlyVec) => atan2Abs(a[1], a[0]);
export const headingXZ = (a: ReadonlyVec) => atan2Abs(a[2], a[0]);
export const headingYZ = (a: ReadonlyVec) => atan2Abs(a[2], a[1]);

export const heading = headingXY;
