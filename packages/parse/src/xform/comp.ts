import { ScopeTransform } from "../api";

export const xfComp = <T>(...xs: ScopeTransform<T>[]): ScopeTransform<T> => {
    const [a, b, c, d] = xs;
    switch (xs.length) {
        case 0:
            return (x) => x;
        case 1:
            return a;
        case 2:
            return (scope, ctx, user) => b(a(scope, ctx, user), ctx, user);
        case 3:
            return (scope, ctx, user) =>
                c(b(a(scope, ctx, user), ctx, user), ctx, user);
        case 4:
            return (scope, ctx, user) =>
                d(c(b(a(scope, ctx, user), ctx, user), ctx, user), ctx, user);
        default:
            return (scope, ctx, user) =>
                xs.reduce((scope, x) => x(scope, ctx, user), scope);
    }
};
