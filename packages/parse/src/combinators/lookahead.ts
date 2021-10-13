import type { Parser } from "../api.js";

/**
 * Repeatedly runs `main` and look-`ahead` parsers for as long as the
 * former succeeds and UNTIL the latter passes or end of input is
 * reached. If the `ahead` parser never passes, the entire parser fails
 * and any partial matches are discarded.
 *
 * @remarks
 * Depending on `capture` (default: false), the result of the `ahead`
 * parser is captured or omitted and the final read position is adjusted
 * accordingly.
 *
 * Currently, iff `capture` is disabled, the `ahead` parser MUST discard
 * its own result (e.g. via {@link discard}). On successful match the
 * final read position will then be restored to the beginning of `ahead`
 * pattern.
 *
 * Iff `capture` is enabled, the `ahead` parser MAY discard its own
 * result, but the final read position will not be re-adjusted as in the
 * non-capturing version.
 *
 * **Important:** Since the main term will be repeated automatically, DO
 * NOT use repetition modifiers `?` or `*`, since both of these will
 * cause the parser to go into an infinite loop. This is expected
 * behavior and not a bug.
 *
 * @example
 * ```ts
 * const ctx = defContext("ababaaabbabba");
 *
 * // consume while 'a' or `b` and until 1st occurrence of "abba"...
 * // note the use of `stringD()` to discard lookahead result
 *
 * // non-capturing lookahead
 * join(lookahead(oneOf("ab"), stringD("abba")))(ctx)
 * // true
 *
 * ctx.result
 * // "ababaa"
 *
 * ctx.state
 * // { p: 6, l: 1, c: 7, done: false, last: 'a' }
 * ```
 *
 * @example
 * ```ts
 * const ctx = defContext("ababaaabbabba");
 *
 * // capturing lookahead
 * join(lookahead(oneOf("ab"), string("abba"), true))(ctx)
 * // true
 *
 * ctx.result
 * // "ababaaabba"
 *
 * ctx.state
 * // { p: 10, l: 1, c: 11, done: false, last: 'a' }
 * ```
 *
 * @param parser
 * @param ahead
 * @param capture
 * @param id
 */
export const lookahead =
    <T>(
        parser: Parser<T>,
        ahead: Parser<T>,
        capture = false,
        id = "lookahead"
    ): Parser<T> =>
    (ctx) => {
        if (ctx.done) return false;
        ctx.start(id);
        let pass = false;
        while (true) {
            const state = capture ? null : { ...ctx.state };
            if (ahead(ctx)) {
                !capture && (ctx.state = state!);
                return pass ? ctx.end() : ctx.discard();
            }
            if (!parser(ctx)) return ctx.discard();
            pass = true;
        }
    };
