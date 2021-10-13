import type { IObjectOf } from "@thi.ng/api";
import { LitCallback, Match, Matcher } from "./api.js";
import { result } from "./result.js";

export const altsLit =
    <T, C, R>(
        opts: Set<T>,
        success?: LitCallback<T, C, R>,
        fail?: LitCallback<T, C, R>
    ): Matcher<T, C, R> =>
    () =>
    (ctx, x) =>
        opts.has(x)
            ? result(success && success(ctx, x))
            : result(fail && fail(ctx, x), Match.FAIL);

export const altsLitObj =
    <C, R>(
        opts: IObjectOf<boolean>,
        success?: LitCallback<string, C, R>,
        fail?: LitCallback<string, C, R>
    ): Matcher<string, C, R> =>
    () =>
    (ctx, x) =>
        opts[x]
            ? result(success && success(ctx, x))
            : result(fail && fail(ctx, x), Match.FAIL);
