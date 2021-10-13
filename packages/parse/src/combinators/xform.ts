import type { Parser, ScopeTransform } from "../api.js";

export const xform =
    <T>(parser: Parser<T>, xf: ScopeTransform<T>, user?: any): Parser<T> =>
    (ctx) => {
        if (parser(ctx)) {
            const children = ctx.scope.children!;
            const scope = children[children.length - 1];
            if (xf(scope, ctx, user)) {
                if (scope.children && !scope.children.length) {
                    scope.children = null;
                }
            } else {
                children.pop();
            }
            return true;
        }
        return false;
    };
