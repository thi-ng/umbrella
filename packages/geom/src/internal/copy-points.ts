import { ReadonlyVec, set } from "@thi.ng/vectors";

export const copyPoints =
    (pts: ReadonlyVec[]) => pts.map((p) => set([], p));
