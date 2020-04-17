import type { Predicate } from "@thi.ng/api";
import type { Parser } from "../api";

export const satisfy = <T>(fn: Predicate<T>, id = "lit"): Parser<T> => (
    ctx
) => {
    if (ctx.done) return false;
    const r = ctx.reader.read(ctx.state!);
    return fn(r) ? ctx.addChild(id, r, true) : false;
};
