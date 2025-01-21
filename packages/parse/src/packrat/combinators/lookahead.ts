import type { ParserOpts, Parser, Scope } from "../api.js";
import { defParser } from "../defparser.js";

export type LookaheadOpts = ParserOpts & { capture?: boolean };

export const lookahead = (
	parser: Parser,
	ahead: Parser,
	{ id = "lookahead", key, memoize, discard, capture }: LookaheadOpts = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("lookahead", id);
			const { curr } = ctx;
			const pos = curr.pos;
			const children: Scope[] = [];
			const $curr: Scope = { id, pos, children };
			ctx.curr = $curr;
			let first = true;
			while (true) {
				let $pos = $curr.pos;
				const numChildren = children.length;
				if (ahead(ctx)) {
					ctx.curr = curr;
					if (first) return { res: false, next: curr.pos };
					if (capture) {
						$pos = $curr.pos;
					} else if (children && children.length > numChildren) {
						children.pop();
					}
					$curr.pos = pos;
					return { res: true, next: $pos, scope: $curr };
				}
				if (!parser(ctx)) {
					ctx.curr = curr;
					return { res: false, next: curr.pos };
				}
				first = false;
			}
		},
		{ key, memoize, discard }
	);

export const until = (
	ahead: Parser,
	{ id = "lookahead", key, memoize, discard, capture }: LookaheadOpts = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("lookahead", id);
			const { curr, src } = ctx;
			const pos = curr.pos;
			const children: Scope[] = [];
			const $curr: Scope = { id, pos, children };
			ctx.curr = $curr;
			while (true) {
				let $pos = $curr.pos;
				const numChildren = children.length;
				if (ahead(ctx)) {
					ctx.curr = curr;
					const result = src.substring(pos, $pos);
					if (capture) {
						children.unshift({ id: "body", pos, result });
						$pos = $curr.pos;
					} else {
						$curr.result = result;
						if (children && children.length > numChildren) {
							children.pop();
						}
					}
					$curr.pos = pos;
					return { res: true, next: $pos, scope: $curr };
				}
				$curr.pos++;
			}
		},
		{ key, memoize, discard }
	);
