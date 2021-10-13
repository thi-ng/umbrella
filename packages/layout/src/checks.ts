import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { ILayout } from "./api.js";

export const isLayout = (x: any): x is ILayout<any, any> =>
    implementsFunction(x, "next");
