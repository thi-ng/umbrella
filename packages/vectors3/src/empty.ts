import { ReadonlyVec } from "./api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { zeroes } from "./setn";

export const empty =
    (v: ReadonlyVec) =>
        implementsFunction(v, "empty") ?
            (<any>v).empty() :
            zeroes(v.length);
