import type { Parser, ScopeTransform } from "../api";

export const xform = <T>(
    parser: Parser<T>,
    xf: ScopeTransform<T>,
    user?: any
): Parser<T> => (ctx) => {
    const res = parser(ctx);
    if (res) {
        const children = ctx.scope.children!;
        const scope = children[children.length - 1];
        const res = xf(scope, ctx, user);
        if (res) {
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
