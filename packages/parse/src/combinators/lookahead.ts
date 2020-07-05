import type { Parser } from "../api";

/**
 * Repeatedly runs look-`ahead` and `main` parsers until the former
 * succeeds or end of input is reached.
 *
 * @remarks
 * Result of `ahead` parser will NOT be cosumed and on successful match
 * the final read position will be at beginning of `ahead` pattern. If
 * the `ahead` parser never succeeds, the entire parser fails and any
 * partial matches are discarded.
 *
 * @example
 * ```ts
 * const ctx = defContext("ababaaabbabba");
 *
 * // consume while 'a' or `b` until 1st occurrence of "abba"
 * join(lookahead(oneOf("ab"), stringD("abba")))(ctx)
 * // true
 *
 * ctx.result
 * // 'ababaa'
 *
 * ctx.state
 * // { p: 6, l: 1, c: 7, done: false, last: 'a' }
 * ```
 *
 * @param parser
 * @param ahead
 * @param id
 */
export const lookahead = <T>(
    parser: Parser<T>,
    ahead: Parser<T>,
    id = "lookahead"
): Parser<T> => (ctx) => {
    if (ctx.done) return false;
    ctx.start(id);
    let pass = false;
    while (true) {
        const state = { ...ctx.state };
        if (ahead(ctx)) {
            ctx.state = state;
            return pass ? ctx.end() : ctx.discard();
        }
        if (!parser(ctx)) return ctx.discard();
        pass = true;
    }
};
