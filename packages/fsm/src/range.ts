import { alts } from "./alts";
import {
    AltCallback,
    LitCallback,
    Matcher,
    RES_FAIL
} from "./api";
import { str } from "./str";
import { success } from "./success";

export const range = <T extends number | string, C, R>(
    min: T,
    max: T,
    callback?: LitCallback<T, C, R>
): Matcher<T, C, R> =>
    () =>
        (ctx, x) =>
            x >= min && x <= max ?
                success(callback && callback(ctx, x)) :
                RES_FAIL;

export const digit =
    <C, R>(callback?: LitCallback<string, C, R>): Matcher<string, C, R> =>
        range("0", "9", callback);

export const alpha =
    <C, R>(callback?: AltCallback<string, C, R>): Matcher<string, C, R> =>
        alts(
            [range("a", "z"), range("A", "Z")],
            null,
            callback
        );

export const alphaNum =
    <C, R>(callback?: AltCallback<string, C, R>): Matcher<string, C, R> =>
        alts([alpha(), digit()], null, callback);

const WS: Matcher<string, any, any>[] =
    [str("\r"), str("\n"), str("\t"), str(" ")];

export const whitespace =
    <C, R>(callback?: AltCallback<string, C, R>): Matcher<string, C, R> =>
        alts(WS, null, callback);
