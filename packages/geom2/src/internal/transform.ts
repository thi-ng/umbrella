import { Mat } from "@thi.ng/matrices/api";
import { mulV } from "@thi.ng/matrices/mulv";
import { ReadonlyVec } from "@thi.ng/vectors3/api";

export const transformPoints = (pts: ReadonlyVec[], mat: Mat) =>
    pts.map((p) => mulV([], mat, p));
