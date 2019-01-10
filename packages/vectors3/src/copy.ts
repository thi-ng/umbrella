import { implementsFunction } from "@thi.ng/checks";
import { ReadonlyVec, Vec } from "./api";

export const copy =
    (v: ReadonlyVec): Vec =>
        implementsFunction(v, "copy") ?
            (<any>v).copy() :
            [...v];
