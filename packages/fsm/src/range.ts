import { alts } from "./alts";
import { altsLit } from "./alts-lit";
import {
    AltCallback,
    AltFallback,
    LitCallback,
    Matcher
} from "./api";
import { result } from "./result";

/**
 * Returns a single input matcher which returns `Match.FULL` if the
 * input is within the closed interval given by [`min`,`max`].
 *
 * @param min
 * @param max
 * @param success
 * @param fail
 */
export const range = <T extends number | string, C, R>(
    min: T,
    max: T,
    success?: LitCallback<T, C, R>,
    fail?: LitCallback<T, C, R>
): Matcher<T, C, R> =>
    () =>
        (ctx, x) =>
            x >= min && x <= max ?
                result(success && success(ctx, x)) :
                result(fail && fail(ctx, x));

/**
 * Matcher for single digit characters (0-9).
 *
 * @param success
 * @param fail
 */
export const digit = <C, R>(
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> =>
    range("0", "9", success, fail);

/**
 * Matcher for single A-Z or a-z characters.
 *
 * @param success
 * @param fail
 */
export const alpha = <C, R>(
    success?: AltCallback<string, C, R>,
    fail?: AltFallback<string, C, R>
): Matcher<string, C, R> =>
    alts(
        [range("a", "z"), range("A", "Z")],
        null,
        success,
        fail
    );

/**
 * Combination of `digit()` and `alpha()`.
 *
 * @param success
 * @param fail
 */
export const alphaNum = <C, R>(
    success?: AltCallback<string, C, R>,
    fail?: AltFallback<string, C, R>
): Matcher<string, C, R> =>
    alts([alpha(), digit()], null, success, fail);

const WS = new Set([" ", "\n", "\t", "\r"]);

/**
 * Matcher for single whitespace characters.
 *
 * @param success
 * @param fail
 */
export const whitespace = <C, R>(
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> =>
    altsLit(WS, success, fail);
