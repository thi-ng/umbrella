import { implementsFunction } from "@thi.ng/checks";
import type { ReadonlyVec, Vec } from "./api";
import { set } from "./set";

export const copy = (v: ReadonlyVec): Vec =>
    implementsFunction(v, "copy") ? v.copy() : set([], v);

export const copyVectors = (pts: ReadonlyVec[]) => pts.map(copy);
