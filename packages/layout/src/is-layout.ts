import { implementsFunction } from "@thi.ng/checks";
import { ILayout } from "./api";

export const isLayout = (x: any): x is ILayout<any, any> =>
    implementsFunction(x, "next");
