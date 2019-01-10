import { Mat, mulV } from "@thi.ng/matrices";
import { ReadonlyVec } from "@thi.ng/vectors3";

export const transformPoints = (pts: ReadonlyVec[], mat: Mat) =>
    pts.map((p) => mulV([], mat, p));
