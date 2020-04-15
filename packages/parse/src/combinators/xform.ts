import { peek } from "@thi.ng/arrays";
import type { Parser, ScopeTransform } from "../api";

export const xform = <T>(
    parser: Parser<T>,
    xf: ScopeTransform<T>,
    user?: any
): Parser<T> => (ctx) => {
    const res = parser(ctx);
    if (res) {
        const scope = peek(ctx.scope.children!);
        const res = xf(scope, ctx, user);
        if (res) {
            if (scope.children && !scope.children.length) {
                scope.children = null;
            }
        } else {
            ctx.scope.children!.pop();
        }
        return true;
    }
    return false;
};
