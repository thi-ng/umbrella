import { copy, ReadonlyVec } from "@thi.ng/vectors3";

export const copyPoints =
    (pts: ReadonlyVec[]) => pts.map((p) => copy(p));
