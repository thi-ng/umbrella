import { implementsFunction } from "@thi.ng/checks/implements-function";
import { ReadonlyVec } from "./api";

export const copy =
    (v: ReadonlyVec) =>
        implementsFunction(v, "copy") ?
            (<any>v).copy() :
            [...v];
