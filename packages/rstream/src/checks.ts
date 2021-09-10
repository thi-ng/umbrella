import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { ISubscribable } from "./api";

export const isSubscribable = (x: any): x is ISubscribable<any> =>
    implementsFunction(x, "subscribe");
