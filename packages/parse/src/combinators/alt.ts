import type { Parser } from "../api.js";
import { string } from "../prims/string.js";
import { discard } from "../xform/discard.js";

export const alt =
	<T>(parsers: Parser<T>[]): Parser<T> =>
	(ctx) => {
		if (ctx.done) return false;
		for (let i = 0, n = parsers.length; i < n; i++) {
			if (parsers[i](ctx)) {
				return true;
			}
		}
		return false;
	};

/**
 * Syntax sugar for {@link alt}. Takes an array of strings to match and creates
 * parsers for each before passing them to `alt()`.
 *
 * @param strings
 */
export const altS = (strings: string[]): Parser<string> =>
	alt(strings.map((x) => string(x)));

/**
 * Wrapped version of {@link alt} which discards results if successful match.
 *
 * @param parsers
 */
export const altD = <T>(parsers: Parser<T>[]) => discard(alt(parsers));
