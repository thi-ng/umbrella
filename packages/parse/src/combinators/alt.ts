import type { Parser } from "../api.js";
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

export const altD = <T>(parsers: Parser<T>[]) => discard(alt(parsers));
