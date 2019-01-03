import { alts } from "./alts";
import {
    AltCallback,
    Match,
    Matcher,
    RangeCallback,
    RES_FAIL
} from "./api";
import { str } from "./str";

export const range = <T extends number | string, C, R>(
    min: T,
    max: T,
    callback?: RangeCallback<T, C, R>
): Matcher<T, C, R> =>
    () =>
        (ctx, x) =>
            x >= min && x <= max ?
                {
                    type: Match.FULL,
                    body: callback && callback(ctx, x)
                } :
                RES_FAIL;

export const digit =
    <C, R>(callback?: RangeCallback<string, C, R>): Matcher<string, C, R> =>
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
