import type { Nullable } from "@thi.ng/api";
import type { ParseScope } from "../api";

export const xfMerge = <T>(scope: Nullable<ParseScope<T>>) => {
    if (!scope || !scope.children) return null;
    const res = [];
    for (let c of scope.children) {
        xfMerge(c);
        if (c.result) res.push(c.result);
    }
    scope.result = res.join("");
    scope.children = null;
    return scope;
};
