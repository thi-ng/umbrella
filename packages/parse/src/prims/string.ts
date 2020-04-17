import type { Parser } from "../api";
import { discard } from "../combinators/discard";

export const string = <T>(str: ArrayLike<T>, id = "string"): Parser<T> => (
    ctx
) => {
    if (ctx.done) return false;
    const scope = ctx.start(id);
    const state = scope.state!;
    const reader = ctx.reader;
    for (let i = 0, n = str.length; i < n; i++) {
        if (state.done) return false;
        const r = reader.read(state);
        if (r !== str[i]) {
            return ctx.discard();
        }
        reader.next(state);
    }
    scope.result = str;
    return ctx.end();
};

export const dstring = <T>(str: ArrayLike<T>) => discard(string(str));
