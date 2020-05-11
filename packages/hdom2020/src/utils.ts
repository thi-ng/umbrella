import type { IDeref } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent } from "./api";

export const isSubscribable = (x: any): x is ISubscribable<any> =>
    implementsFunction(x, "subscribe");

export const isComponent = (x: any): x is IComponent<any> =>
    implementsFunction(x, "mount");

export const isDeref = (x: any): x is IDeref<any> =>
    implementsFunction(x, "deref");
