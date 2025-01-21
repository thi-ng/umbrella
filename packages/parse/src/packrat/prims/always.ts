import type { Discarded, Parser, ParserOpts } from "../api.js";
import { addChild } from "../context.js";

export type AlwaysOpts = Omit<ParserOpts, "key" | "memoize" | "onFail">;

export const always =
	({ id = "always", discard }: AlwaysOpts = {}): Parser =>
	(ctx) => {
		ctx.debug?.("always", id);
		const {
			curr: { pos },
			src,
		} = ctx;
		if (pos >= src.length) return false;
		if (!discard) {
			addChild(ctx.curr, { id, pos: pos, result: src[pos] });
		}
		ctx.curr.pos++;
		// if (ctx.prune) prune(ctx);
		return true;
	};

export const alwaysD = (opts?: Discarded<AlwaysOpts>) =>
	always({ ...opts, discard: true });
