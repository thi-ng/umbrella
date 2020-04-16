import { isFunction } from "@thi.ng/checks";
import type { Lift, Parser } from "../api";

export const not = <T, R = any>(
    parser: Parser<T>,
    lift?: Lift<R>,
    id = "not"
): Parser<T> => (ctx) => {
    if (ctx.done) return false;
    const scope = ctx.start(id);
    if (parser(ctx)) {
        ctx.discard();
        return false;
    }
    scope.result = lift != null ? (isFunction(lift) ? lift() : lift) : null;
    return ctx.end();
};
