import { mulV, ReadonlyMat } from "@thi.ng/matrices";
import { ReadonlyVec } from "@thi.ng/vectors";

export const transformPoints = (pts: ReadonlyVec[], mat: ReadonlyMat) => (
    pts.forEach((p) => mulV(null, mat, p)), pts
);

export const transformedPoints = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    pts.map((p) => mulV([], mat, p));
