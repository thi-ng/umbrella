import type { Parser } from "../api";
import type { Predicate } from "@thi.ng/api";

/**
 * Consumes input, but ignores it as long as given `pred` fn returns
 * true. The char for which `pred` fails will NOT be consumed and the
 * context state will be forwarded to that position. If `pred` never
 * returns false before the end of the input is reached, this parser
 * will return false and context state remains untouched.
 *
 * @example
 * ```ts
 * const comment = dseq([lit("#"), skipWhile((x) => x !== "\n"), NL]);
 *
 * const ctx = defContext("# ignore more!\n");
 * comment(ctx);
 * // true
 *
 * ctx.state
 * // { p: 15, l: 2, c: 1, done: true, last: '\n' }
 * ```
 *
 * @param pred
 */
export const skipWhile = <T>(pred: Predicate<T>): Parser<T> => (ctx) => {
    const state = { ...ctx.state };
    const reader = ctx.reader;
    while (!state.done) {
        if (!pred(reader.read(state))) {
            ctx.state = state;
            return true;
        }
        reader.next(state);
    }
    return false;
};
