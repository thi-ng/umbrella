import { LitCallback, Matcher } from "./api";
import { success } from "./success";

export const always =
    <T, C, R>(callback?: LitCallback<T, C, R>): Matcher<T, C, R> =>
        () =>
            (ctx, x) =>
                success(callback && callback(ctx, x));
