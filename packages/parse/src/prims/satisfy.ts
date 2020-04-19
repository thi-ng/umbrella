import type { Predicate } from "@thi.ng/api";
import type { Parser, LitParser } from "../api";

export function satisfy<T>(pred: Predicate<T>, id = "lit") {
    const parser: Parser<T> = (ctx) => {
        if (ctx.done) return false;
        const r = ctx.reader.read(ctx.state);
        return pred(r) ? ctx.addChild(id, r, true) : false;
    };
    return <LitParser<T>>parser;
}

/**
 * Like {@link satisfy}, but avoids creating AST node and discards
 * result.
 *
 * @param pred
 */
export function satisfyD<T>(pred: Predicate<T>) {
    const parser: Parser<T> = (ctx) => {
        if (ctx.done) return false;
        const state = ctx.state!;
        const reader = ctx.reader;
        return pred(reader.read(state)) ? (reader.next(state), true) : false;
    };
    return <LitParser<T>>parser;
}
