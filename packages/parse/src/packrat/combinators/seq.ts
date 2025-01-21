import type { Discarded, Parser, ParserOpts, Scope } from "../api.js";
import { defParser } from "../defparser.js";

export const seq = (
	parsers: Parser[],
	{ id = "seq", key, memoize, discard, onFail }: ParserOpts = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("seq", id);
			const { curr } = ctx;
			const pos = curr.pos;
			const $curr: Scope = { id, pos };
			ctx.curr = $curr;
			let failed = false;
			for (let p of parsers) {
				if (!p(ctx)) {
					failed = true;
					break;
				}
			}
			ctx.curr = curr;
			return failed
				? { res: false, next: $curr.pos }
				: { res: true, next: $curr.pos, scope: { ...$curr, pos } };
		},
		{ key, memoize, discard, onFail }
	);

export const seqD = (parsers: Parser[], opts?: Discarded<ParserOpts>) =>
	seq(parsers, { ...opts, discard: true });
