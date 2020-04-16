import type { Predicate } from "@thi.ng/api";
import type { Parser } from "../api";

export const satisfy = <T>(fn: Predicate<T>, id = "lit"): Parser<T> => (
    ctx
) => {
    if (ctx.done) return false;
    const reader = ctx.reader;
    const r = reader.read(ctx.state!);
    if (!fn(r)) {
        return false;
    }
    const scope = ctx.start(id);
    reader.next(scope.state!);
    scope.result = r;
    return ctx.end();
};
