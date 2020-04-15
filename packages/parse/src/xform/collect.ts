import { ScopeTransform } from "../api";

export const xfCollect: ScopeTransform<any> = (scope) => {
    scope!.result = scope!.children!.map((c) => c.result);
    scope!.children = null;
    return scope;
};
