import { isFunction } from "@thi.ng/checks";
import type { Parser, PassValue } from "../api";

export const not = <T, R = any>(
    parser: Parser<T>,
    result?: PassValue<R>,
    id = "not"
): Parser<T> => (ctx) => {
    if (ctx.done) return false;
    const scope = ctx.start(id);
    if (parser(ctx)) {
        return ctx.discard();
    }
    scope.result =
        result != null ? (isFunction(result) ? result() : result) : null;
    return ctx.end();
};
