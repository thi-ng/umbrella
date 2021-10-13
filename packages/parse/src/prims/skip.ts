import type { Predicate } from "@thi.ng/api";
import type { Parser } from "../api.js";

/**
 * Consumes input, but ignores it as long as given `pred` predicate fn
 * returns true. The char for which `pred` fails will NOT be consumed
 * and the context state will be forwarded to that position. If the end
 * of the input is reached, this parser will return true.
 *
 * @example
 * ```ts
 * const comment = seqD([litD("#"), skipWhile(noneOfP("\n")), NL]);
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
export const skipWhile =
    <T>(pred: Predicate<T>): Parser<T> =>
    (ctx) => {
        const state = { ...ctx.state };
        const reader = ctx.reader;
        while (!state.done) {
            if (!pred(reader.read(state))) break;
            reader.next(state);
        }
        ctx.state = state;
        return true;
    };
