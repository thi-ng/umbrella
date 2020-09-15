import { implementsFunction } from "@thi.ng/checks";
import type { ReadonlyVec, Vec } from "./api";
import { zeroes } from "./setn";

export const empty = (v: ReadonlyVec): Vec =>
    implementsFunction(v, "empty") ? (<any>v).empty() : zeroes(v.length);
