import { implementsFunction } from "@thi.ng/checks";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent } from "./api";

export const isSubscribable = (x: any): x is ISubscribable<any> =>
    implementsFunction(x, "subscribe");

export const isComponent = (x: any): x is IComponent<any> =>
    implementsFunction(x, "mount");
