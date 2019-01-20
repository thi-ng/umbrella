import { ReadonlyVec, set } from "@thi.ng/vectors3";

export const copyPoints =
    (pts: ReadonlyVec[]) => pts.map((p) => set([], p));
