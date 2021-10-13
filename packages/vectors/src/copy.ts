import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { ReadonlyVec, Vec } from "./api.js";
import { set } from "./set.js";

export const copy = (v: ReadonlyVec): Vec =>
    implementsFunction(v, "copy") ? v.copy() : set([], v);

export const copyVectors = (pts: ReadonlyVec[]) => pts.map(copy);
