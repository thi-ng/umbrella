import { implementsFunction } from "@thi.ng/checks/implements-function";

export const empty = (x: any, ctor: Function) =>
    implementsFunction(x, "empty")
        ? x.empty()
        : new (x[Symbol.species] || ctor)();
