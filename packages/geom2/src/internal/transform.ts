import { IMatrix, ReadonlyVec } from "@thi.ng/vectors2/api";

export const transformPoints = (pts: ReadonlyVec[], mat: IMatrix<any>) =>
    pts.map((p) => mat.mulV(p));
