import type { Nullable, Predicate2 } from "@thi.ng/api";
import { ALPHA_NUM } from "@thi.ng/strings/groups";
import type { Parser } from "../api.js";

export const anchor =
    <T>(fn: Predicate2<Nullable<T>>): Parser<T> =>
    (ctx) => {
        const state = ctx.state;
        return fn(state.last, state.done ? null : ctx.reader.read(state));
    };

export const inputStart: Parser<any> = (ctx) => ctx.state.last == null;

export const inputEnd: Parser<any> = (ctx) =>
    ctx.state.done || ctx.reader.read(ctx.state) === undefined;

export const lineStart: Parser<string> = (ctx) => {
    const l = ctx.state.last;
    return l == null || l === "\n" || l === "\r";
};

export const lineEnd: Parser<string> = (ctx) => {
    const state = ctx.state;
    let c: string;
    return state.done || (c = ctx.reader.read(state)) === "\n" || c === "\r";
};

export const wordBoundaryP: Predicate2<Nullable<string>> = (prev, next) => {
    return prev
        ? next
            ? ALPHA_NUM[prev] && !ALPHA_NUM[next]
            : ALPHA_NUM[prev]
        : next
        ? ALPHA_NUM[next]
        : false;
};

export const wordBoundary = anchor(wordBoundaryP);
