import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { ReadonlyVec, Vec } from "./api.js";
import { zeroes } from "./setn.js";

export const empty = (v: ReadonlyVec): Vec =>
    implementsFunction(v, "empty") ? v.empty() : zeroes(v.length);
