import type { Fn2, Nullable } from "@thi.ng/api";
import type { Parser } from "../api";

export const anchor = <T>(
    fn: Fn2<Nullable<T>, Nullable<T>, boolean>
): Parser<T> => (ctx) => {
    const state = ctx.state;
    return fn(state.last, state.done ? null : ctx.reader.read(state));
};

export const inputStart: Parser<any> = (ctx) => ctx.state.last == null;

export const inputEnd: Parser<any> = (ctx) =>
    ctx.state.done || !ctx.reader.read(ctx.state);

export const lineStart: Parser<string> = (ctx) => {
    const l = ctx.state.last;
    return l == null || l === "\n" || l === "\r";
};

export const lineEnd: Parser<string> = (ctx) => {
    const state = ctx.state;
    let c: string;
    return state.done || (c = ctx.reader.read(state)) === "\n" || c === "\r";
};
