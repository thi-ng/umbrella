import type { FnU2 } from "@thi.ng/api";
import type { ReadonlyVec } from "./api";
import { distSq } from "./distsq";

export const dist: FnU2<ReadonlyVec, number> = (a, b) =>
    Math.sqrt(distSq(a, b));
