import type { Predicate } from "@thi.ng/api";
import type { LitParser } from "../api.js";

export const satisfy = <T>(pred: Predicate<T>, id = "satisfy") =>
    <LitParser<T>>((ctx) => {
        if (ctx.done) return false;
        const r = ctx.reader.read(ctx.state);
        return pred(r) ? ctx.addChild(id, r, true) : false;
    });

/**
 * Like {@link satisfy}, but avoids creating AST node and discards
 * result.
 *
 * @param pred - 
 */
export const satisfyD = <T>(pred: Predicate<T>) => <LitParser<T>>((ctx) => {
        if (ctx.done) return false;
        const state = ctx.state!;
        const reader = ctx.reader;
        return pred(reader.read(state)) ? (reader.next(state), true) : false;
    });
