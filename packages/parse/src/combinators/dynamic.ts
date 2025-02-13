// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { DynamicParser, Parser } from "../api.js";
import type { ParseContext } from "../context.js";

/**
 * Returns a parser function placeholder, whose implementation can be set at a
 * later stage via calling `.set()`. The parser always fails until set, after
 * which it then delegates to the chosen impl.
 *
 * @example
 * ```ts tangle:../../export/dynamic.ts
 * import { defContext, dynamic,lit  } from "@thi.ng/parse";
 *
 * const parser = dynamic<string>();
 * parser.set(lit("a"));
 *
 * console.log(parser(defContext("a")));
 * // true
 * ```
 */
export const dynamic = <T = string>(): DynamicParser<T> => {
	let impl: Maybe<Parser<T>>;
	const wrapper: any = (ctx: ParseContext<T>) => impl?.(ctx) ?? false;
	wrapper.deref = () => impl;
	wrapper.set = (p: Parser<T>) => (impl = p);
	return wrapper;
};
