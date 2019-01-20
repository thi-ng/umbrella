import { ReadonlyVec } from "./api";
import { distSq } from "./distsq";

export const dist =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        Math.sqrt(distSq(a, b));
