import { alts } from "./alts";
import {
    AltCallback,
    LitCallback,
    Matcher,
    RES_FAIL
} from "./api";
import { result } from "./result";
import { str } from "./str";

/**
 * Returns a single input matcher which returns `Match.FULL` if the
 * input is within the closed interval given by [`min`,`max`].
 *
 * @param min
 * @param max
 * @param callback
 */
export const range = <T extends number | string, C, R>(
    min: T,
    max: T,
    callback?: LitCallback<T, C, R>
): Matcher<T, C, R> =>
    () =>
        (ctx, x) =>
            x >= min && x <= max ?
                result(callback && callback(ctx, x)) :
                RES_FAIL;

/**
 * Matcher for single digit characters (0-9).
 *
 * @param callback
 */
export const digit =
    <C, R>(callback?: LitCallback<string, C, R>): Matcher<string, C, R> =>
        range("0", "9", callback);

/**
 * Matcher for single A-Z or a-z characters.
 *
 * @param callback
 */
export const alpha =
    <C, R>(callback?: AltCallback<string, C, R>): Matcher<string, C, R> =>
        alts(
            [range("a", "z"), range("A", "Z")],
            null,
            callback
        );

/**
 * Combination of `digit()` and `alpha()`.
 *
 * @param callback
 */
export const alphaNum =
    <C, R>(callback?: AltCallback<string, C, R>): Matcher<string, C, R> =>
        alts([alpha(), digit()], null, callback);

const WS: Matcher<string, any, any>[] =
    [str("\r"), str("\n"), str("\t"), str(" ")];

/**
 * Matcher for single whitespace characters.
 *
 * @param callback
 */
export const whitespace =
    <C, R>(callback?: AltCallback<string, C, R>): Matcher<string, C, R> =>
        alts(WS, null, callback);
