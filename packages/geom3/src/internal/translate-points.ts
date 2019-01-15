import { add, ReadonlyVec } from "@thi.ng/vectors3";

export const translatedPoints =
    (pts: ReadonlyVec[], delta: ReadonlyVec) =>
        pts.map((x) => add([], x, delta));
