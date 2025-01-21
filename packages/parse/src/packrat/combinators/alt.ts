import type { Discarded, Parser, ParserOpts } from "../api.js";
import { defParser } from "../defparser.js";

export const alt = (
	parsers: Parser[],
	{ id = "alt", key, memoize, discard, onFail }: ParserOpts = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("alt", id);
			const {
				curr: { pos, children },
			} = ctx;
			const numChildren = children?.length ?? 0;
			for (let p of parsers) {
				if (p(ctx)) {
					if (discard) {
						if (children && children.length > numChildren)
							children.pop();
					}
					return { res: true, next: pos };
				}
			}
			return { res: false, next: pos };
		},
		{ key, memoize, discard, onFail }
	);

export const altD = (parsers: Parser[], opts?: Discarded<ParserOpts>) =>
	alt(parsers, { ...opts, discard: true });
