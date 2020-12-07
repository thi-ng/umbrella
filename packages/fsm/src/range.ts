import { ALPHA, DIGITS, WS } from "@thi.ng/strings";
import { altsLitObj } from "./alts-lit";
import type { LitCallback, Matcher } from "./api";
import { result } from "./result";

/**
 * Returns a single input matcher which returns `Match.FULL` if the
 * input is within the closed interval given by [`min`,`max`].
 *
 * @param min - min repetitions
 * @param max - max repetitions
 * @param success - success callback
 * @param fail - failure callback
 */
export const range = <T extends number | string, C, R>(
    min: T,
    max: T,
    success?: LitCallback<T, C, R>,
    fail?: LitCallback<T, C, R>
): Matcher<T, C, R> => () => (ctx, x) =>
    x >= min && x <= max
        ? result(success && success(ctx, x))
        : result(fail && fail(ctx, x));

/**
 * Matcher for single digit characters (0-9).
 *
 * @param success - success callback
 * @param fail - failure callback
 */
export const digit = <C, R>(
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> => altsLitObj(DIGITS, success, fail);

/**
 * Matcher for single A-Z or a-z characters.
 *
 * @param success - success callback
 * @param fail - failure callback
 */
export const alpha = <C, R>(
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> => altsLitObj(ALPHA, success, fail);

/**
 * Combination of {@link digit} and {@link alpha}.
 *
 * @param success - success callback
 * @param fail - failure callback
 */
export const alphaNum = <C, R>(
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> => altsLitObj({ ...ALPHA, ...DIGITS }, success, fail);

/**
 * Matcher for single whitespace characters.
 *
 * @param success - success callback
 * @param fail - failure callback
 */
export const whitespace = <C, R>(
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> => altsLitObj(WS, success, fail);
