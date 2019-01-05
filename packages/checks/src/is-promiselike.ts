import { implementsFunction } from "./implements-function";

export const isPromiseLike =
    (x: any): x is Promise<any> =>
        x instanceof Promise ||
        (implementsFunction(x, "then") && implementsFunction(x, "catch"));
