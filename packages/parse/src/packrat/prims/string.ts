import type { Discarded, ParserOpts } from "../api.js";
import { defParser } from "../defparser.js";

export const string = (
	match: string,
	{ id = "string", key, memoize, discard, onFail }: ParserOpts = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("string", id);
			const pos = ctx.curr.pos;
			return ctx.src.indexOf(match, pos) !== pos
				? { res: false, next: pos }
				: {
						res: true,
						next: pos + match.length,
						scope: { id, pos, result: match },
				  };
		},
		{ key, memoize, discard, onFail }
	);

export const stringD = (match: string, opts?: Discarded<ParserOpts>) =>
	string(match, { ...opts, discard: true });
