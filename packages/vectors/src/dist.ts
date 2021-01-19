import type { FnU2 } from "@thi.ng/api";
import type { ReadonlyVec } from "./api";
import { distSq, distSq2, distSq3 } from "./distsq";

export const dist: FnU2<ReadonlyVec, number> = (a, b) =>
    Math.sqrt(distSq(a, b));

export const dist2: FnU2<ReadonlyVec, number> = (a, b) =>
    Math.sqrt(distSq2(a, b));

export const dist3: FnU2<ReadonlyVec, number> = (a, b) =>
    Math.sqrt(distSq3(a, b));
