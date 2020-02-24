import { implementsFunction } from "@thi.ng/checks";
import type { ILayout } from "./api";

export const isLayout = (x: any): x is ILayout<any, any> =>
    implementsFunction(x, "next");
