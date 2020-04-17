import { ScopeTransform } from "../api";
import { xfJoin } from "./join";

export const xfInt = (radix = 10): ScopeTransform<string> => (scope) => {
    scope!.result = parseInt(xfJoin(scope)!.result, radix);
    return scope;
};

export const xfFloat: ScopeTransform<string> = (scope) => {
    scope!.result = parseFloat(xfJoin(scope)!.result);
    return scope;
};
