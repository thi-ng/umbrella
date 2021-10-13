import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import type { IToEGFConvert, Node, NodeRef } from "./api.js";

export const isNode = (x: any): x is Node => isPlainObject(x) && "$id" in x;

export const isRef = (x: any): x is NodeRef => isPlainObject(x) && "$ref" in x;

export const isToEGF = (x: any): x is IToEGFConvert =>
    implementsFunction(x, "toEGF");
