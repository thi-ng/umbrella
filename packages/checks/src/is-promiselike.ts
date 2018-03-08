import { implementsFunction } from "./implements-function";

export function isPromiseLike(x: any): x is Promise<any> {
    return x instanceof Promise ||
        (implementsFunction(x, "then") && implementsFunction(x, "catch"));
}
