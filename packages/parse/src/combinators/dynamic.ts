import type { Nullable } from "@thi.ng/api";
import type { DynamicParser, Parser } from "../api";
import type { ParseContext } from "../context";

/**
 * Returns a parser function placeholder, whose implementation can be
 * set at a later stage via calling `.set()`.
 *
 * @examples
 * ```ts
 * const parser = dynamic<string>();
 * parser.set(lit("a"));
 *
 * parser(defContext("a"));
 * // true
 * ```
 */
export const dynamic = <T = string>(): DynamicParser<T> => {
    let impl: Nullable<Parser<T>>;
    const wrapper: any = (ctx: ParseContext<T>) => (impl ? impl(ctx) : false);
    wrapper.set = (p: Parser<T>) => (impl = p);
    return wrapper;
};
