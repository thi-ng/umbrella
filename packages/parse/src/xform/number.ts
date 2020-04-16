import { ScopeTransform } from "../api";
import { xfMerge } from "./merge";

export const xfInt = (radix = 10): ScopeTransform<string> => (scope) => {
    scope!.result = parseInt(xfMerge(scope)!.result, radix);
    return scope;
};

export const xfFloat: ScopeTransform<string> = (scope) => {
    scope!.result = parseFloat(xfMerge(scope)!.result);
    return scope;
};
