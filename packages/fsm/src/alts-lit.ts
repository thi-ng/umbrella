import { LitCallback, Matcher, Match } from "./api";
import { result } from "./result";

export const altsLit = <T, C, R>(
    opts: Set<T>,
    success?: LitCallback<T, C, R>,
    fail?: LitCallback<T, C, R>
): Matcher<T, C, R> => () => (ctx, x) =>
    opts.has(x)
        ? result(success && success(ctx, x))
        : result(fail && fail(ctx, x), Match.FAIL);
