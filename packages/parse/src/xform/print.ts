import { ScopeTransform } from "../api";

export const xfPrint: ScopeTransform<any> = (scope, _, indent = 0) => {
    if (!scope) return;
    const prefix = indent > 0 ? "  ".repeat(indent) : "";
    const state = scope.state;
    const info = state ? ` (${state.l}:${state.c})` : "";
    console.log(`${prefix}${scope.id}${info}: ${JSON.stringify(scope.result)}`);
    if (scope.children) {
        for (let c of scope.children) {
            xfPrint(c, _, indent + 1);
        }
    }
    return scope;
};
