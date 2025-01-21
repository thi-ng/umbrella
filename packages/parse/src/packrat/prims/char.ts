import type { Discarded, Parser, ParserOpts } from "../api.js";
import { addChild } from "../context.js";

export type CharOpts = Omit<ParserOpts, "key" | "memoize">;

export const char =
	(match: string, { id = match, discard, onFail }: CharOpts = {}): Parser =>
	(ctx) => {
		ctx.debug?.("char", id);
		const pos = ctx.curr.pos;
		if (ctx.src[pos] !== match) {
			onFail?.(pos, ctx);
			return false;
		}
		!discard && addChild(ctx.curr, { id, pos, result: match });
		ctx.curr.pos++;
		// if (ctx.prune) prune(ctx);
		return true;
	};

export const charD = (match: string, opts?: Discarded<CharOpts>) =>
	char(match, { ...opts, discard: true });
